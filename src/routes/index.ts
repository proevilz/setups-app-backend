import express, { Application, Request, Response } from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response) => {
  res.send('Yep, this is an API!');
});

export default router;
