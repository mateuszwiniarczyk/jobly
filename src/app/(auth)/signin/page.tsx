import Link from 'next/link';

import { SignInForm } from '@/app/(auth)/components/SignInForm';

const SignInPage = () => (
  <div className='mx-auto mt-20 max-w-md'>
    <h1 className='mb-2.5 text-center text-3xl font-bold lg:text-4xl'>
      Sign In to your account
    </h1>
    <p className='mb-10 text-center text-sm font-normal text-muted-foreground'>
      Enter your details to proceed further
    </p>
    <SignInForm />
    <span className='mt-5 block text-sm text-muted-foreground'>
      You don’t have an account?{' '}
      <Link href='/signup' className='font-semibold'>
        Sign Up
      </Link>
    </span>
  </div>
);

export default SignInPage;
