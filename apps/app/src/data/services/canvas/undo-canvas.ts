import { Snapshot } from '../../../entities/snapshot/snapshot-schema';
import { db } from '../../db/db';
import { createSnapshot } from '../snapshots/create-snapshot';
import { restoreSnapshot } from '../snapshots/restore-snapshot';
import * as jsondiffpatch from 'jsondiffpatch';

export type UndoCanvasParams = {
  canvasId: string;
};

export const undoCanvas = async ({ canvasId }: UndoCanvasParams) => {
  const start = Date.now();
  console.log(`canvas ${canvasId}: undo started`);
  const patches = await db.canvasPatches
    .where('canvasId')
    .equals(canvasId)
    .sortBy('createdAt');

  if (patches.length === 0) {
    console.log(`canvas ${canvasId}: undo no-more`);
    return;
  }

  const patch = patches[patches.length - 1];
  await db.canvasPatches.where('snapshotId').equals(patch.snapshotId).delete();

  const current = await createSnapshot({ canvasId: canvasId });
  const restored = jsondiffpatch.unpatch(
    current,
    patch.delta as jsondiffpatch.Delta
  ) as Snapshot;

  // console.log(restored);
  await restoreSnapshot(restored);

  console.log(`canvas ${canvasId}: undo completed ${Date.now() - start}`);
};
