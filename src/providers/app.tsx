'use client';

import { ThemeProvider } from 'next-themes';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
    {children}
  </ThemeProvider>
);
