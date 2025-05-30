'use client';
import { emailType } from '@/db/schemas/emails';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import React from 'react';
import PreviewDialogBtn from './PreviewDialogBtn';
import SaveEmailBtn from './SaveEmailBtn';
import PublishEmailBtn from './PublishEmailBtn';
import Designer from './Designer';
import DragOverlayWrapper from './DragOverlayWrapper';

function EmailDesigner({ email }: { email: emailType }) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext sensors={sensors}>
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
      <DragOverlayWrapper />
    </DndContext>
  );
}

export default EmailDesigner;
