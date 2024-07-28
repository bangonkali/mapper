import { Snapshot } from '../../../entities/snapshot/snapshot-schema';
import { db } from '../../db/db';

export type CreateSnapshotParams = {
  canvasId: string;
};

export const createSnapshot = async ({
  canvasId,
}: CreateSnapshotParams): Promise<Snapshot | undefined> => {
  const canvases = await db.canvases
    .where('canvasId')
    .equals(canvasId)
    .toArray();

  if (canvases.length === 0) return;
  const canvas = canvases[0];

  const annotations = await db.annotations
    .where('canvasId')
    .equals(canvasId)
    .toArray();

  const annotationTags = await db.annotationTags
    .where('canvasId')
    .equals(canvasId)
    .toArray();

  const snapshot = {
    canvasId,
    canvas,
    annotations,
    annotationTags,
  };

  return snapshot;
};
