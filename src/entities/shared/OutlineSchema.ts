import { z } from 'zod';
import { ColorSchema } from './ColorSchema';

export const OutlineSchema = z.object({
  brush: ColorSchema,
  thickness: z.number(),
});
