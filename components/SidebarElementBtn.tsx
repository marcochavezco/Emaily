import React from 'react';
import { Button } from './ui/button';
import { EmailElement } from './EmailElements';
import { useDraggable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

function SidebarElementBtn({ emailElement }: { emailElement: EmailElement }) {
  const { icon: Icon, label } = emailElement.DesignerBtn;

  const draggable = useDraggable({
    id: `designer-btn-${emailElement.type}`,
    data: {
      type: emailElement.type,
      isDesignerElementBtn: true,
    },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      variant={'outline'}
      className={cn(
        'flex flex-col gap-2 h-[120px] w-[120px] cursor-grab',
        draggable.isDragging && 'ring-2 ring-primary'
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className='h-8 w-8 text-primary cursor-grab' />
      <p className='text-xs'>{label}</p>
    </Button>
  );
}

export function SidebarElementBtnDragOverlay({
  emailElement,
}: {
  emailElement: EmailElement;
}) {
  const { icon: Icon, label } = emailElement.DesignerBtn;

  return (
    <Button
      variant={'outline'}
      className={'flex flex-col gap-2 h-[120px] w-[120px] cursor-grab'}
    >
      <Icon className='h-8 w-8 text-primary cursor-grab' />
      <p className='text-xs'>{label}</p>
    </Button>
  );
}

export default SidebarElementBtn;
