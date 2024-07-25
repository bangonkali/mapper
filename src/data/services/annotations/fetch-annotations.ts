import { db } from '../../db/db';

export type FetchAnnotationsParams = {
  canvasId: string;
};

export const fetchAnnotations = async (params: FetchAnnotationsParams) => {
  const { canvasId } = params;
  if (!canvasId) return [];
  const annotations = await db.annotations
    .where('canvasId')
    .equals(canvasId)
    .sortBy('createdAt');

  return annotations;
};
