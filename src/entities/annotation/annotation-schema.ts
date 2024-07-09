import { z } from "zod";
import { RectangleAnnotationSchema } from "./types/rectangle-annotation-schema";
import { SquareAnnotationSchema } from "./types/square-annotation-schema";

export const AnnotationSchema = z.discriminatedUnion("type", [
  RectangleAnnotationSchema,
  SquareAnnotationSchema,
]);

export type Annotation = z.infer<typeof AnnotationSchema>;
