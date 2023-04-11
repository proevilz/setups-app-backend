import express, { Application, Request, Response } from 'express';
import { prisma } from '../utils';

const router = express.Router();

router.get('/', async function (req, res) {
  const allPosts = await prisma.post.findMany();
  res.json(allPosts);
});

router.post('/add', async function (req, res) {
  interface Ibody {
    title: string;
    content: string;
    userId: string;
    photos: {
      url: string;
    }[];
  }
  const { title, content, userId, photos }: Ibody = req.body;

  const newPost = await prisma.post.create({
    data: {
      title: req.body.title,
      content: req.body.content,
      userId: Number(req.body.userId),
      photos: {
        create: photos.map(photo => ({
          userId: Number(userId),
          url: photo.url,
        })),
      },
    },
  });

  res.json(newPost);
});

export default router;
