import { Snapshot } from '../../../entities/snapshot/snapshot-schema';
import { db } from '../../db/db';
import {
  currentAnnotationsStore,
  currentAnnotationTagsStore,
  currentCanvasStore,
} from '../../store/active-canvas-store';

export const restoreSnapshot = async (canvasSnapshot: Snapshot) => {
  // update the caches!
  currentAnnotationTagsStore.setState(() => canvasSnapshot.annotationTags);
  currentCanvasStore.setState(() => canvasSnapshot.canvas);
  currentAnnotationsStore.setState(() => canvasSnapshot.annotations);

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
