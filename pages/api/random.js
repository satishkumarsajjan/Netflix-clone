import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const moviesCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * moviesCount);

    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return res.status(200).json(randomMovies[0]);
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}
