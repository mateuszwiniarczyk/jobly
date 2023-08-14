'use client';

import { Toaster as SoonerToaster } from 'sonner';

export const Toaster = () => (
  <SoonerToaster
    position='bottom-right'
    toastOptions={{
      style: {
        background: 'hsl(var(--background))',
        color: 'hsl(var(--foreground))',
        border: '1px solid hsl(var(--border))',
      },
    }}
  />
);
