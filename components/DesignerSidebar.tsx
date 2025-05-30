import React from 'react';
import EmailElementsSidebar from './EmailElementsSidebar';
import EmailPropertiesSidebar from './EmailPropertiesSidebar';
import useDesigner from './hooks/useDesigner';

function DesignerSidebar() {
  const { selectedElement } = useDesigner();
  return (
    <aside className='w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full'>
      {!selectedElement && <EmailElementsSidebar />}
      {selectedElement && <EmailPropertiesSidebar />}
    </aside>
  );
}

export default DesignerSidebar;
