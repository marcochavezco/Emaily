import { GetEmails } from '@/actions/emails';
import CreateEmailBtn from '@/components/CreateEmailBtn';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { emailType } from '@/db/schemas/emails';
import Link from 'next/link';
import { Suspense } from 'react';
import { formatDistance } from 'date-fns';
import { Edit } from 'lucide-react';

export default function Home() {
  return (
    <div className='container p-4'>
      <h2 className='text-4xl font-bold'>Designs</h2>
      <Separator className='my-6' />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <CreateEmailBtn />
        <Suspense
          fallback={[...Array(3)].map((el) => (
            <EmailCardsSkeleton key={el} />
          ))}
        >
          <EmailCards />
        </Suspense>
      </div>
    </div>
  );
}

function EmailCardsSkeleton() {
  return <Skeleton className='border-2 border-primary/20 h-[220px] w-full' />;
}

async function EmailCards() {
  const emails = await GetEmails();
  console.log(emails);
  return (
    <>
      {emails.map((email) => (
        <EmailCard key={email.id} email={email} />
      ))}
    </>
  );
}

function EmailCard({ email }: { email: emailType }) {
  console.log(email);
  return (
    <Card className='w-auto h-[220px]'>
      <CardHeader>
        <CardTitle className='flex justify-between items-center gap-2'>
          <span className='truncate font-bold'>{email.name}</span>
          {email.status === 'draft' && (
            <Badge variant={'secondary'}>Draft</Badge>
          )}
          {email.status === 'active' && (
            <Badge className='text-primary-foreground'>Active</Badge>
          )}
        </CardTitle>
        <CardDescription className='h-[50px]'>
          Updated{' '}
          {formatDistance(new Date(email.updatedAt), new Date(), {
            addSuffix: true,
          })}
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className='w-full flex justify-center items-center gap-4'>
        <Button
          asChild
          className='w-auto mt-2 text-md gap-4 text-primary-foreground'
        >
          <Link href={`/designer/${email.id}`}>
            Edit Email <Edit />
          </Link>
        </Button>
        <Button
          asChild
          variant={'ghost'}
          className='w-auto mt-2 text-xs gap-4 underline underline-offset-4'
        >
          <Link href={`/emails/details/${email.id}`}>Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
