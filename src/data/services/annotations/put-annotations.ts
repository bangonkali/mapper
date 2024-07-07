import { Annotation } from "../../../entities/annotation/annotation-schema";
import { db } from "../../db/db";

export type PutAnnotationParams = {
  data: Annotation;
};

export const putAnnotations = async ({ data }: PutAnnotationParams) => {
  const annotations = await db.annotations.put(data);
  return annotations;
};
