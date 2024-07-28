import { ulid } from 'ulidx';
import { db } from '../../data/db/db';
import { createSnapshot } from '../../data/services/snapshots/create-snapshot';
import * as jsondiffpatch from 'jsondiffpatch';

export type SnapshotOnExecuteParams<T> = () => Promise<T>;

export const snapshotOnExecute = async <T>(
  func: SnapshotOnExecuteParams<T>,
  canvasId: string
): Promise<T> => {
  const before = await createSnapshot({ canvasId: canvasId });
  const data = await func();

  const snapshotId = ulid();
  const after = await createSnapshot({ canvasId: canvasId });
  if (after && before) {
    const delta = jsondiffpatch.diff(before, after) as jsondiffpatch.Delta;
    await db.canvasPatches.add({
      canvasId: canvasId,
      delta: delta,
      createdAt: Date.now(),
      snapshotId: snapshotId,
    });
  }
  return data;
};
