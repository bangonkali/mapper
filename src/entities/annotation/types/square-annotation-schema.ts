import { z } from "zod";
import { AnnotationBaseSchema } from "../annotation-base-schema";
import { ColorSchema } from "../../shared/ColorSchema";
import { OutlineSchema } from "../../shared/OutlineSchema";

/**
 * A schema for a rectangle annotation.
 */
export const SquareAnnotationSchema = AnnotationBaseSchema.extend({
  /**
   * The type of the annotation.
   */
  type: z.literal("square"),

  /**
   * The frame number of the annotation.
   */
  frame: z.number(),

  /**
   * The x-coordinate of the top-left corner of the rectangle.
   */
  x: z.number(),

  /**
   * The y-coordinate of the top-left corner of the rectangle.
   */
  y: z.number(),

  /**
   * The rotation of the rectangle.
   */
  rotation: z.number(),

  /**
   * The width of the rectangle.
   */
  width: z.number(),

  /**
   * The height of the rectangle.
   */
  height: z.number(),

  /**
   * The fill color of the rectangle.
   */
  fill: ColorSchema,

  /**
   * The outline of the rectangle.
   */
  outline: OutlineSchema,
});

export type SquareAnnotation = z.infer<typeof SquareAnnotationSchema>;