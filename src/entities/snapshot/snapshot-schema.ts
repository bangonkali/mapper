import { AnnotationSchema } from '../annotation/annotation-schema';
import { AnnotationTagSchema } from '../annotation/annotation-tag-schema';
import { CanvasSchema } from '../canvas/canvas-schema';
import { z } from 'zod';

export const SnapshotSchema = z.object({
  snapshotId: z.string().ulid(),
  canvasId: z.string().ulid(),
  createdAt: z.number(),
  canvas: CanvasSchema,
  annotations: z.array(AnnotationSchema),
  annotationTags: z.array(AnnotationTagSchema),
  description: z.string().optional(),
});

export type Snapshot = z.infer<typeof SnapshotSchema>;
