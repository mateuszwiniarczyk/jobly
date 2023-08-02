import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <div className='relative flex min-h-screen flex-col bg-background'>
    <Header />
    <main className='flex-1'>
      <div className='container py-6'>{children}</div>
    </main>
    <Footer />
  </div>
);
