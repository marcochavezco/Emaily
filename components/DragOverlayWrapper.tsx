import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React, { useState } from 'react';
import { SidebarElementBtnDragOverlay } from './SidebarElementBtn';
import { ElementsType, EmailElements } from './EmailElements';

function DragOverlayWrapper() {
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

  let node = <div>Drag Overlay</div>;

  const isSidebarElementBtn = draggedItem.data?.current?.isDesignerElementBtn;

  if (isSidebarElementBtn) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = <SidebarElementBtnDragOverlay emailElement={EmailElements[type]} />;
  }

  return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapper;
