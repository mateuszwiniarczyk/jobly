import { getServerSession } from 'next-auth';

import { Logo } from '@/components/layout/Logo';
import { UserDropdown } from '@/components/layout/UserDropdown';
import { authOptions } from '@/lib/auth';

export const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='container flex h-20 items-center justify-between py-4'>
        <Logo />
        <UserDropdown user={session?.user} />
      </div>
    </header>
  );
};
