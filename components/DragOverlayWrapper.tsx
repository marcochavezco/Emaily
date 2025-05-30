import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React, { useState } from 'react';
import { SidebarElementBtnDragOverlay } from './SidebarElementBtn';
import { ElementsType, EmailElements } from './EmailElements';
import useDesigner from './hooks/useDesigner';

function DragOverlayWrapper() {
  const { elements } = useDesigner();

  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },

    onDragCancel: () => {
      setDraggedItem(null);
    },

    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;

  let node = <div>No Drag Overlay</div>;

  const isSidebarElementBtn = draggedItem.data?.current?.isDesignerElementBtn;

  if (isSidebarElementBtn) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = <SidebarElementBtnDragOverlay emailElement={EmailElements[type]} />;
  }

  const isDesignerElement = draggedItem.data?.current?.isDesignerElement;

  if (isDesignerElement) {
    const elementId = draggedItem.data?.current?.elementId;
    const element = elements.find((element) => element.id === elementId);
    if (!element) {
      return <div>Element Not Found</div>;
    }
    const DesignerElement = EmailElements[element.type].Designer;
    node = (
      <div className='bg-accent border w-full h-auto opacity-80 pointer-events-none'>
        <DesignerElement elementInstance={element} />
      </div>
    );
  }

  return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapper;
