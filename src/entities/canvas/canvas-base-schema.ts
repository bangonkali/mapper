import { z } from 'zod';

export const CanvasBaseSchema = z.object({
  canvasId: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export type CanvasBase = z.infer<typeof CanvasBaseSchema>;
