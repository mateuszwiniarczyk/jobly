'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
    <SessionProvider>{children}</SessionProvider>
  </ThemeProvider>
);
