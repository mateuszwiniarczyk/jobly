import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { SignInForm } from '@/app/(auth)/components/SignInForm';
import { authOptions } from '@/lib/auth';

const SignInPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return (
    <div className='mx-auto my-10 max-w-md'>
      <h1 className='mb-2.5 text-center text-3xl font-bold lg:text-4xl'>
        Sign In to your account
      </h1>
      <p className='mb-10 text-center text-sm font-normal text-muted-foreground'>
        Enter your details to proceed further
      </p>
      <SignInForm />
      <div className='mt-5 flex items-start justify-between gap-2.5 text-sm text-muted-foreground'>
        <span className='block flex-1 sm:flex-auto'>
          Don't have an account?{' '}
          <Link href='/signup' className='font-semibold'>
            Sign Up
          </Link>
        </span>
        <Link
          className='block flex-1 text-right font-semibold sm:flex-auto'
          href='/reset-password'
        >
          Reset password
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
