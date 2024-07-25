import { Annotation } from '../../../entities/annotation/annotation-schema';
import { db } from '../../db/db';
import { createSnapshot } from '../snapshots/create-snapshot';

export type PutAnnotationParams = {
  data: Annotation;
};

export const putAnnotations = async ({ data }: PutAnnotationParams) => {
  // create a snapshot
  await createSnapshot({ canvasId: data.canvasId });

  // apply the mutation
  const annotations = await db.annotations.put(data);
  return annotations;
};
