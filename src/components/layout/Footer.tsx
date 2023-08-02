import { ThemeToggle } from '@/components/ThemeToggle';

export const Footer = () => {
  return (
    <footer className='w-full border-t bg-background'>
      <div className='container py-6'>
        <div className='flex items-center justify-between'>
          <span className='text-sm leading-loose text-muted-foreground'>
            Copyright &#169; 2023 Jobly
          </span>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
};
