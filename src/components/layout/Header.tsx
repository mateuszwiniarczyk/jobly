import Link from 'next/link';

import LogoIcon from '~/logo.svg';

export const Header = () => (
  <header className='sticky top-0 z-40 w-full border-b bg-background'>
    <div className='container flex h-20 items-center py-4'>
      <Logo />
    </div>
  </header>
);

const Logo = () => (
  <Link href='/'>
    <LogoIcon className='h-11 w-11' />
  </Link>
);
