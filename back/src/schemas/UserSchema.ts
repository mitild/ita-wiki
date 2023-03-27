import { z } from 'zod';
import { DNISchema } from './DNISchema';

export const UserSchema = z.object({
  id: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  dni: DNISchema
});