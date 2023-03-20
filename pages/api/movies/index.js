import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const movies = await prismadb.movie.findMany();

    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
