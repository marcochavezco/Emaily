import React from 'react';
import SidebarElementBtn from './SidebarElementBtn';
import { EmailElements } from './EmailElements';

function EmailElementsSidebar() {
  return (
    <>
      Elements
      <SidebarElementBtn emailElement={EmailElements.Text} />
    </>
  );
}

export default EmailElementsSidebar;
