import { z } from 'zod';

/**
 * This is the base schema for all annotations. It contains the fields that are common to all annotations.
 *
 * This schema should not be used directly. Instead, it should be extended by other schemas that define
 * specific types of annotations.
 */
export const AnnotationBaseSchema = z.object({
  annotationId: z.string().ulid(), // the unique identifier for this annotation
  canvasId: z.string().ulid(), // the image gallery item that this annotation is tied to
  title: z.string(), // the image gallery item that this annotation is tied to
  description: z.string(), // the image gallery item that this annotation is tied to
  createdAt: z.number(),
  updatedAt: z.number(),
  parentAnnotationId: z.string().optional(), // the parent annotation of this annotation
  index: z.number(), // the index of the annotation
});

export type AnnotationBase = z.infer<typeof AnnotationBaseSchema>;
