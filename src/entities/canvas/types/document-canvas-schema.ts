import { z } from 'zod';
import { CanvasBaseSchema } from '../canvas-base-schema';

export const DocumentCanvasSchema = CanvasBaseSchema.extend({
  type: z.literal('image'),
  width: z.number(),
  height: z.number(),
  src: z.string(),
  selected: z.boolean(),
  ratio: z.number(),
  caption: z.string(),
});

export type DocumentCanvas = z.infer<typeof DocumentCanvasSchema>;
