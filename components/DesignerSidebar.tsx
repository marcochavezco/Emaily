import React from 'react';
import { EmailElements } from './EmailElements';
import SidebarElementBtn from './SidebarElementBtn';

function DesignerSidebar() {
  return (
    <aside className='w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full'>
      Elements
      <SidebarElementBtn emailElement={EmailElements.Text} />
    </aside>
  );
}

export default DesignerSidebar;
