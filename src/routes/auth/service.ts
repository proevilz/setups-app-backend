import { User } from '@prisma/client';
import { prisma, exclude } from '../../utils';
import bcrypt from 'bcrypt';
import { InvalidPasswordError } from '../../errors';

interface RequestBody {
  username: string;
  email: string;
  password: string;
}

export const createUser = async (
  body: RequestBody
): Promise<Omit<User, 'password'>> => {
  const hash = await bcrypt.hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      username: body.username,
      email: body.email,
      password: hash,
    },
  });

  const userWithoutPassword = exclude(newUser, ['password']);
  return userWithoutPassword;
};

export const authenticateUser = async (
  body: Omit<RequestBody, 'username'>
): Promise<Omit<User, 'password'>> => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: body.email,
    },
  });

  const match = await bcrypt.compare(body.password, user.password);
  if (!match) {
    throw new InvalidPasswordError('Password did not match');
  }
  const userWithoutPassword = exclude(user, ['password']);
  return userWithoutPassword;
};
