import { Annotation } from '../../../entities/annotation/annotation-schema';
import { snapshotOnExecute } from '../../../utils/canvas/snapshot-on-execute';
import { db } from '../../db/db';

export type PutAnnotationParams = {
  data: Annotation;
};

export const putAnnotations = async ({ data }: PutAnnotationParams) => {
  return await snapshotOnExecute(() => {
    return db.annotations.put(data);
  }, data.canvasId);
};
