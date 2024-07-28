import { z } from 'zod';

export const CanvasPatchSchema = z.object({
  snapshotId: z.string().ulid(),
  canvasId: z.string().ulid(),
  createdAt: z.number(),
  delta: z.unknown(),
  description: z.string().optional(),
});

export type CanvasPatch = z.infer<typeof CanvasPatchSchema>;
