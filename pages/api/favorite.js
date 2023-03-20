import prismadb from '@/lib/prismadb';

import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const session = await getSession({ req });

    if (!session?.user?.email) {
      throw new Error('Not signed in');
    }

    const { movieId } = req.body;

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      throw new Error('Invalid ID');
    }

    const user = await prismadb.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        favoriteIds: {
          push: movieId,
        },
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}
