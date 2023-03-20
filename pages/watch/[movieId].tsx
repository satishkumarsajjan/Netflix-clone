import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import useMovie from '@/hooks/useMovie';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie(movieId as string);

  return (
    <div className='h-screen w-screen bg-black'>
      <nav className='fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70'>
        <ArrowLeftIcon
          onClick={() => router.push('/')}
          className='w-10 text-white cursor-pointer hover:opacity-80 transition'
        />
        <p className='text-white text-3xl font-bold'>
          <span className='font-light'>Watching:</span> {data?.title}
        </p>
      </nav>
      <video
        className='h-full w-full'
        autoPlay
        controls
        src={data?.videoUrl}
      ></video>
    </div>
  );
};

export default Watch;
