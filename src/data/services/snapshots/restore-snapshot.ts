import { db } from '../../db/db';

export type RestoreSnapshotParams = {
  snapshotId: string;
};

export const restoreSnapshot = async ({
  snapshotId,
}: RestoreSnapshotParams) => {
  const snapshots = await db.snapshots
    .where('snapshotId')
    .equals(snapshotId)
    .toArray();

  if (snapshots.length === 0) return;
  const snapshot = snapshots[0];

  await db.annotationTags.where('canvasId').equals(snapshot.canvasId).delete();
  await db.annotations.where('canvasId').equals(snapshot.canvasId).delete();

  await db.annotations.bulkAdd(snapshot.annotations);
  await db.annotationTags.bulkAdd(snapshot.annotationTags);

  await db.canvases.put(snapshot.canvas);
};
