import { z } from "zod";
import { RectangleAnnotationSchema } from "./types/rectangle-annotation-schema";

export const AnnotationSchema = z.discriminatedUnion("type", [
  RectangleAnnotationSchema,
]);

export type Annotation = z.infer<typeof AnnotationSchema>;
