import { z } from "zod";

/**
 * This is the base schema for all annotations. It contains the fields that are common to all annotations.
 *
 * This schema should not be used directly. Instead, it should be extended by other schemas that define
 * specific types of annotations.
 */
export const AnnotationBaseSchema = z.object({
  annotationId: z.string().uuid(), // the unique identifier for this annotation
  galleryItemId: z.string().uuid(), // the image gallery item that this annotation is tied to
  title: z.string(), // the image gallery item that this annotation is tied to
  description: z.string(), // the image gallery item that this annotation is tied to
});

export type AnnotationBase = z.infer<typeof AnnotationBaseSchema>;
