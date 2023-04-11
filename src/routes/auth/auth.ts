import express, { Request, Response } from 'express';
import { generateJwt } from '../../utils';
import { authenticateUser, createUser } from './service';
import { InvalidPasswordError } from '../../errors';

const router = express.Router();

router.post('/signup', async function (req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    const token = await generateJwt(user);

    res.json({ token });
  } catch (error: any) {
    if (error?.code === 'P2002') {
      const field = error.meta.target[0];
      res.status(400).json({
        type: `USER_EXISTS/${field.toUpperCase()}`,
        message: `An account with this ${field} already exists`,
      });
      return;
    }

    res.status(500).json({
      type: 'UNKNOWN',
      message: 'Something went wrong, please contact the administrator',
    });
  }
});

router.post('/signin', async function (req: Request, res: Response) {
  try {
    const authedUser = await authenticateUser(req.body);
    const token = await generateJwt(authedUser);

    res.json({ token });
  } catch (error: any) {
    if (
      error instanceof InvalidPasswordError ||
      error?.name === 'NotFoundError'
    ) {
      res.status(401).json({
        type: `INVALID_CREDENTIALS`,
        message: `Email or password is incorrect`,
      });
      return;
    }
    res.status(500).json({
      error: 'Something went wrong, please contact the administrator',
    });
  }
});

export default router;
