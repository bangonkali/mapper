import { z } from "zod";

/**
 * This is the schema for an annotation tag. An annotation tag is a
 * label that is attached to an annotation.
 */
export const AnnotationTagSchema = z.object({
  /**
   * This is the schema for an annotation tag. An annotation tag is a
   * label that is attached to an annotation.
   */
  annotationTagId: z.string().uuid(),

  /**
   * The image gallery item that this annotation tag is tied to.
   */
  galleryItemId: z.string().uuid(),

  /**
   * The annotation that this tag is tied to.
   */
  annotationId: z.string().uuid(),

  /**
   * The text of the annotation tag.
   */
  value: z.string(),

  /**
   * The key of the annotation tag.
   */
  type: z.string(),
});

export type AnnotationTag = z.infer<typeof AnnotationTagSchema>;
