import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const { userEmail } = req.query;

    if (typeof userEmail !== 'string') {
      throw new Error('Invalid Id');
    }

    if (!userEmail) {
      throw new Error('Missing Id');
    }

    const user = await prismadb.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
