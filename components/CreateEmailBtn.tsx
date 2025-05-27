'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { FilePlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { emailSchema, emailSchemaType } from '@/schemas/emails';
import { CreateEmail } from '@/actions/emails';
import { useRouter } from 'next/navigation';

function CreateEmailBtn() {
  const router = useRouter();

  const form = useForm<emailSchemaType>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (values: emailSchemaType) => {
    try {
      const emailId = await CreateEmail(values);
      toast.success('Email design created successfully!');
      router.push(`/designer/${emailId}`);
    } catch {
      toast.error('Something went wrong, please try later');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className='group border border-primary/20 border-dashed h-[220px] flex flex-col items-center justify-center gap-4 text-primary hover:bg-primary/10 hover:border-primary/30'
        >
          <FilePlus className='h-8 w-8 text-primary' />
          <p>Create New Email</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Design</DialogTitle>
          <DialogDescription>Add a new email desing</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Design Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Name' {...field} />
                  </FormControl>
                  <FormDescription>
                    Define an Design Design name, this will help to find your
                    design
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='subject'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Design Subject</FormLabel>
                  <FormControl>
                    <Input placeholder='Subject' {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the subject your recipients will see
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='preheader'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Design Preheader</FormLabel>
                  <FormControl>
                    <Input placeholder='Preheader' {...field} />
                  </FormControl>
                  <FormDescription>
                    Add a preheader message to give a hint of the email&apos;s
                    content
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            className='w-full mt-4 text-foreground'
          >
            {!form.formState.isSubmitting && <span>Save</span>}
            {form.formState.isSubmitting && (
              <ImSpinner2 className='animate-spin'></ImSpinner2>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateEmailBtn;
