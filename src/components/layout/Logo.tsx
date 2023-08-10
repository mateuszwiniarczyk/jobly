import Link from 'next/link';

import LogoIcon from '~/logo.svg';

export const Logo = () => (
  <Link href='/'>
    <LogoIcon className='h-11 w-11' />
  </Link>
);
