import express, { Application, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async function (req, res) {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
});

router.get('/:userId/photos', function (req, res) {
  const userId: number = Number(req.body.userId);
  const allPhotos = prisma.photo.findMany({
    where: {
      userId,
    },
  });
  res.json(allPhotos);
});

export default router;
