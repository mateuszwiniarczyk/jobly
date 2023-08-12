import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { ResetPasswordForm } from '@/app/(auth)/components/ResetPasswordForm';
import { authOptions } from '@/lib/auth';

const ResetPasswordPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return (
    <div className='mx-auto my-10 max-w-md'>
      <h1 className='mb-2.5 text-center text-3xl font-bold lg:text-4xl'>
        Reset password
      </h1>
      <p className='mb-10 text-center text-sm font-normal text-muted-foreground'>
        Enter your email address and we will send you a verification email
      </p>
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordPage;
