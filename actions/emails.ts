'use server';

import { db } from '@/db';
import { emails } from '@/db/schemas/emails';
import { emailSchema, emailSchemaType } from '@/schemas/emails';
import { currentUser } from '@clerk/nextjs/server';
import { desc, eq } from 'drizzle-orm';

class UserNotFoundError extends Error {}

export async function CreateEmail(data: emailSchemaType) {
  const validation = emailSchema.safeParse(data);
  if (!validation.success) {
    throw new Error('Email not valid');
  }
  console.log('Name in server', data.name);

  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  const { name, subject, preheader } = data;

  const email = await db
    .insert(emails)
    .values({
      name,
      subject,
      preheader,
      createdBy: user.id,
      updatedBy: user.id,
    })
    .returning();

  if (!email) {
    throw new Error('Form not created');
  }

  const emailId = email[0].id;

  return emailId;
}

export async function GetEmails() {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  const result = await db
    .select()
    .from(emails)
    .where(eq(emails.createdBy, user.id))
    .orderBy(desc(emails.updatedBy));

  return result;
}
