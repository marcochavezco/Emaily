import CreateEmailBtn from '@/components/CreateEmailBtn';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className='container p-4'>
      <h2 className='text-4xl font-bold'>Designs</h2>
      <Separator className='my-6' />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <CreateEmailBtn />
      </div>
    </div>
  );
}
