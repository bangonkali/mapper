import { db } from "../../db/db";

export type FetchAnnotationParams = {
  annotationId: string;
  galleryItemId: string;
};

export const fetchAnnotation = async ({
  annotationId,
  galleryItemId,
}: FetchAnnotationParams) => {
  const annotation = await db.annotations
    .where({
      annotationId,
      galleryItemId,
    })
    .first();
  return annotation;
};
