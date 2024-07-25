import { db } from '../../db/db';
import { ulid } from 'ulidx';

export type CreateSnapshotParams = {
  canvasId: string;
};

export const createSnapshot = async ({ canvasId }: CreateSnapshotParams) => {
  const canvases = await db.canvases
    .where('canvasId')
    .equals(canvasId)
    .toArray();

  if (canvases.length === 0) return;
  const canvas = canvases[0];
  const snapshotId = ulid();

  const annotations = await db.annotations
    .where('canvasId')
    .equals(canvasId)
    .toArray();

  const annotationTags = await db.annotationTags
    .where('canvasId')
    .equals(canvasId)
    .toArray();

  const snapshot = {
    snapshotId: snapshotId,
    canvasId,
    createdAt: Date.now(),
    canvas,
    annotations,
    annotationTags,
  };

  await db.snapshots.add(snapshot);
};
