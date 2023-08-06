import Link from 'next/link';

import { SignUpForm } from '@/app/(auth)/components/SignUpForm';

const SignUpPage = () => (
  <div className='mx-auto my-10 max-w-md'>
    <h1 className='mb-2.5 text-center text-3xl font-bold lg:text-4xl'>
      Tell us about yourself
    </h1>
    <p className='mb-10 text-center text-sm font-normal text-muted-foreground'>
      Enter your details to proceed further
    </p>
    <SignUpForm />
    <span className='mt-5 block text-sm text-muted-foreground'>
      Already have an account?{' '}
      <Link href='/signin' className='font-semibold'>
        Sign In
      </Link>
    </span>
  </div>
);

export default SignUpPage;
