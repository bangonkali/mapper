import { z } from 'zod';

/**
 * This is the schema for an annotation tag. An annotation tag is a
 * label that is attached to an annotation.
 */
export const AnnotationTagSchema = z.object({
  /**
   * This is the schema for an annotation tag. An annotation tag is a
   * label that is attached to an annotation.
   */
  annotationTagId: z.string().ulid(),

  /**
   * The image gallery item that this annotation tag is tied to.
   */
  canvasId: z.string().ulid(),

  /**
   * The annotation that this tag is tied to.
   */
  annotationId: z.string().ulid(),

  /**
   * The text of the annotation tag.
   */
  value: z.string(),

  /**
   * The key of the annotation tag.
   */
  type: z.string(),

  /**
   * The date and time that this annotation tag was created.
   * This is a Unix timestamp.
   * @example 1616590873
   */
  createdAt: z.number(),

  /**
   * The date and time that this annotation tag was last updated.
   * This is a Unix timestamp.
   * @example 1616590873
   */
  updatedAt: z.number(),
});

export type AnnotationTag = z.infer<typeof AnnotationTagSchema>;
