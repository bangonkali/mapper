import { Snapshot } from '../../../entities/snapshot/snapshot-schema';
import { db } from '../../db/db';

export const restoreSnapshot = async (canvasSnapshot: Snapshot) => {
  await db.annotationTags
    .where('canvasId')
    .equals(canvasSnapshot.canvasId)
    .delete();
  await db.annotations
    .where('canvasId')
    .equals(canvasSnapshot.canvasId)
    .delete();
  await db.annotations.bulkAdd(canvasSnapshot.annotations);
  await db.annotationTags.bulkAdd(canvasSnapshot.annotationTags);
  await db.canvases.put(canvasSnapshot.canvas);
};
