import ThemeSwitcher from '@/components/ThemeSwitcher';
import { UserButton } from '@clerk/nextjs';
import React from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen min-w-full bg-background max-h-screen'>
      <nav className='flex items-center justify-between p-4 bg-background border-b border-border'>
        <div className='text-lg font-bold'>Emaily</div>
        <div className='flex items-center space-x-4'>
          <ThemeSwitcher />
          <UserButton afterSwitchSessionUrl='/sign-in' />
        </div>
      </nav>
      <main className='flex w-full flex-grow'>{children}</main>
    </div>
  );
}

export default Layout;
