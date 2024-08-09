import { db } from '../../db/db';
import { currentAnnotationTagsStore } from '../../store/active-canvas-store';

export type FetchAnnotationTagsParams = {
  canvasId: string;
};

export const fetchAnnotationTags = async (
  params: FetchAnnotationTagsParams
) => {
  const { canvasId } = params;
  if (!canvasId) return [];
  const annotationTags = await db.annotationTags
    .where('canvasId')
    .equals(canvasId)
    .sortBy('index');

  // cache
  currentAnnotationTagsStore.setState(() => {
    return annotationTags;
  });

  return annotationTags;
};
