import { db } from '../../db/db';

export type FetchAnnotationParams = {
  annotationId: string;
  canvasId: string;
};

export const fetchAnnotation = async ({
  annotationId,
  canvasId,
}: FetchAnnotationParams) => {
  if (!annotationId || !canvasId) return null;
  const annotation = await db.annotations
    .where({
      annotationId,
      canvasId,
    })
    .first();
  return annotation ?? null;
};
