'use client';

import Link from 'next/link';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { buttonVariants } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

interface UserDropdownProps {
  user: Session['user'] | null;
}

export const UserDropdown = ({ user }: UserDropdownProps) => (
  <>
    {user ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='h-11 w-11 cursor-pointer'>
            <AvatarImage src='/avatar.png' alt='avatar' />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuLabel>
            <div className='flex flex-col space-y-1'>
              <p className='text-capitalize text-sm font-medium leading-none'>
                {user.name}
              </p>
              <p className='text-xs leading-none text-muted-foreground'>
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>Account</DropdownMenuItem>
          <DropdownMenuItem disabled>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ) : (
      <div className='flex gap-2'>
        <Link href='/signup'>
          <div
            className={buttonVariants({
              size: 'sm',
              variant: 'outline',
            })}
          >
            Sign Up
            <span className='sr-only'>Sign In</span>
          </div>
        </Link>
        <Link href='/signin'>
          <div
            className={buttonVariants({
              size: 'sm',
            })}
          >
            Sign In
            <span className='sr-only'>Sign In</span>
          </div>
        </Link>
      </div>
    )}
  </>
);
