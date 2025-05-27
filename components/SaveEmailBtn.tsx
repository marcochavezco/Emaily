import { SaveIcon } from 'lucide-react';
import { Button } from './ui/button';

function SaveEmailBtn() {
  return (
    <Button variant={'outline'}>
      <SaveIcon className='w-6 h-6' />
      Save
    </Button>
  );
}

export default SaveEmailBtn;
