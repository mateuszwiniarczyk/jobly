import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { UpdatePasswordForm } from '@/app/(auth)/components/UpdatePasswordForm';
import { authOptions } from '@/lib/auth';

const UpdatePasswordPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession(authOptions);
  const { token } = searchParams;
  if (session || !token || typeof token !== 'string') {
    redirect('/');
  }

  return (
    <div className='mx-auto my-10 max-w-md'>
      <h1 className='mb-2.5 text-center text-3xl font-bold lg:text-4xl'>
        Update password
      </h1>
      <p className='mb-10 text-center text-sm font-normal text-muted-foreground'>
        Enter your new password below.
      </p>
      <UpdatePasswordForm resetPasswordToken={token} />
    </div>
  );
};

export default UpdatePasswordPage;
