import express, { Express } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

import indexRouter from './routes/index';
import authRouter from './routes/auth/auth';
import usersRouter from './routes/users';
import postsRouter from './routes/posts';

const app: Express = express();
const port = process.env.PORT || 3000;
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.listen(port, function () {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
