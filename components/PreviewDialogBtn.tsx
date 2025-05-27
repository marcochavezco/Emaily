import React from 'react';
import { Button } from './ui/button';
import { EyeIcon } from 'lucide-react';

function PreviewDialogBtn() {
  return (
    <Button variant={'outline'}>
      <EyeIcon className='w-6 h-6' />
      Preview
    </Button>
  );
}

export default PreviewDialogBtn;
