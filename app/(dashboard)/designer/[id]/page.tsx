import { GetEmailById } from '@/actions/emails';
import Designer from '@/components/Designer';
import PreviewDialogBtn from '@/components/PreviewDialogBtn';
import PublishEmailBtn from '@/components/PublishEmailBtn';
import SaveEmailBtn from '@/components/SaveEmailBtn';
import { emailType } from '@/db/schemas/emails';
import React from 'react';

async function DesignerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const email: emailType = await GetEmailById(Number(id));

  if (!email) {
    throw new Error('Email not found');
  }
  return (
    <main className='flex flex-col w-full'>
      <nav className='flex justify-between items-center border-b-2 p-4 gap-4'>
        <div className='flex flex-col justify-center items-start'>
          <h2 className='truncate font-medium'>
            <span className='text-muted-foreground'>Email: {email.name}</span>
          </h2>
          <span className='text-muted-foreground text-xs'>
            Subject: {email.subject}
          </span>
          <span className='text-muted-foreground text-xs'>
            Preheader: {email.preheader}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <PreviewDialogBtn />
          <SaveEmailBtn />
          <PublishEmailBtn />
        </div>
      </nav>
      <div className='flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]'>
        <Designer />
      </div>
    </main>
  );
}

export default DesignerPage;
