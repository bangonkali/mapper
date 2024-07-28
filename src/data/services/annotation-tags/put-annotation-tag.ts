import { AnnotationTag } from '../../../entities/annotation/annotation-tag-schema';
import { snapshotOnExecute } from '../../../utils/canvas/snapshot-on-execute';
import { db } from '../../db/db';

export type PutAnnotationTagParams = {
  data: AnnotationTag;
};

export const putAnnotationTags = async ({ data }: PutAnnotationTagParams) => {
  return await snapshotOnExecute(() => {
    return db.annotationTags.put(data);
  }, data.canvasId);
};
