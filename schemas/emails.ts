import { z } from 'zod';

export const emailSchema = z.object({
  name: z.string().min(4, 'Name is required'),
  subject: z.string().min(4).optional(),
  preheader: z.string().min(4).optional(),
});

export type emailSchemaType = z.infer<typeof emailSchema>;
