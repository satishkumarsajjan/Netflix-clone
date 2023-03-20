import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import { getSession } from 'next-auth/react';

export default async function handler(
  req,
  res
) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const session = await getSession({ req });

    if (!session?.user?.email) {
      throw new Error('Not signed in');
    }

    const currentUser = await prismadb.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    const favoritedMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    });

    return res.status(200).json(favoritedMovies);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
