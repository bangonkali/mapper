import { db } from '../../db/db';
import { restoreSnapshot } from '../snapshots/restore-snapshot';

export type UndoCanvasParams = {
  canvasId: string;
};

export const undoCanvas = async ({ canvasId }: UndoCanvasParams) => {
  console.log('initiating undo for ' + canvasId);
  const snapshots = await db.snapshots
    .where('canvasId')
    .equals(canvasId)
    .sortBy('createdAt');

  if (snapshots.length === 0) return;
  const snapshot = snapshots[snapshots.length - 1];
  await restoreSnapshot({ snapshotId: snapshot.snapshotId });
  await db.snapshots.where('snapshotId').equals(snapshot.snapshotId).delete();
};
