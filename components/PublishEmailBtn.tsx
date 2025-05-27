import { ShareIcon } from 'lucide-react';
import { Button } from './ui/button';

function PublishEmailBtn() {
  return (
    <Button variant={'secondary'} className='bg-primary'>
      <ShareIcon className='w-6 h-6' />
      Publish
    </Button>
  );
}

export default PublishEmailBtn;
