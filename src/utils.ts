import jwt from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';

export const prisma = new PrismaClient();

export const generateJwt = async (user: Omit<User, 'password'>) => {
  const jwtSecret = process.env.JWT_ACCESS_TOKEN;
  if (!jwtSecret) {
    throw new Error('jwtSecret not defined');
  }
  return jwt.sign({ user }, jwtSecret, {
    expiresIn: '1h',
  });
};

// Removes the specific key from the passed in user
export const exclude = <User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> => {
  for (let key of keys) {
    delete user[key];
  }
  return user;
};
