'use client';

import Image from 'next/image';
import { useEffect } from 'react';

import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // @TODO: Log the error to an error reporting service
  }, [error]);

  return (
    <div className='flex flex-col items-center justify-center gap-2.5 text-center'>
      <Image
        src='/hanging-monkey.png'
        alt='error occurred'
        width={120}
        height={153}
      />
      <h1 className='text-4xl font-semibold'>Oops...</h1>
      <p>Something is wrong, but we're working on it!</p>
      <Button onClick={() => reset()} className='mt-2.5'>
        Try again
      </Button>
    </div>
  );
}
