'use client';

import { idGenerator } from '@/lib/idGenerator';
import { cn } from '@/lib/utils';
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import { PlusCircle, Trash } from 'lucide-react';
import { useState } from 'react';
import DesignerSidebar from './DesignerSidebar';
import {
  ElementsType,
  EmailElementInstance,
  EmailElements,
} from './EmailElements';
import useDesigner from './hooks/useDesigner';
import { Button } from './ui/button';

const Designer = () => {
  const { elements, addElement } = useDesigner();

  const droppable = useDroppable({
    id: 'desinger-drop-area',
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;

      if (!active || !over) return;

      const isDesignerElementBtn = active.data?.current?.isDesignerElementBtn;

      if (isDesignerElementBtn) {
        const type = active.data?.current?.type as ElementsType;
        const newElement = EmailElements[type].construct(idGenerator());

        addElement(0, newElement);
      }
    },
  });

  return (
    <div className='flex w-full h-full'>
      <div className='p-4 w-full'>
        <div
          ref={droppable.setNodeRef}
          className={cn(
            `bg-background max-w-[600px] h-full m-auto flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto`,
            droppable.isOver && 'ring-4 ring-primary ring-inset'
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className='text-3xl text-muted-foreground flex flex-grow items-center font-bold'>
              Drop here
            </p>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className='p-4 w-full'>
              <div className='h-[120px] bg-primary/20'></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className='flex flex-col w-full'>
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};

function DesignerElementWrapper({
  element,
}: {
  element: EmailElementInstance;
}) {
  const { removeElement } = useDesigner();

  const [isMouseOver, setIsMouseOver] = useState(false);

  const topHalf = useDroppable({
    id: `${element.id}-top`,
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });
  const bottomHalf = useDroppable({
    id: `${element.id}-bottom`,
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: `${element.id}-drag-handler`,
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;

  const DesignerElement = EmailElements[element.type].Designer;

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      className='relative w-full h-auto flex flex-col text-muted-foreground hover:cursor-pointer'
    >
      {isMouseOver && (
        <div className='absolute top-0 h-full w-full ring ring-accent-foreground ring-inset bg-muted/40'>
          <div className='h-full flex justify-end items-center'>
            <Button
              onClick={(e) => {
                return removeElement(element.id);
              }}
              className='h-full flex justify-center items-center bg-red-700 hover:bg-red-500 hover:cursor-pointer rounded-none z-10'
            >
              <Trash className='h-6 w-6 text-accent-foreground' />
            </Button>
          </div>
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-1/2 animate-pulse'>
            <p className='text-muted-foreground text-sm'>
              Click for Inspector or Drag to Move
            </p>
          </div>
        </div>
      )}
      {topHalf.isOver && (
        <div className='absolute top-0 w-full h-[0px] border border-dashed border-accent flex justify-center items-center'>
          <PlusCircle className='h-4 w-4' />
        </div>
      )}
      <div
        ref={topHalf.setNodeRef}
        className={'absolute h-1/2 w-full top-0'}
      ></div>
      <div className={cn('opacity-100', isMouseOver && 'opacity-30')}>
        <DesignerElement elementInstance={element} />
      </div>
      <div
        ref={bottomHalf.setNodeRef}
        className='absolute h-1/2 w-full bottom-0'
      ></div>
      {bottomHalf.isOver && (
        <div className='absolute bottom-0 w-full h-[0px] border border-dashed border-accent flex justify-center items-center'>
          <PlusCircle className='h-4 w-4' />
        </div>
      )}
    </div>
  );
}

export default Designer;
