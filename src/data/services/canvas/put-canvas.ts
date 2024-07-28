import { Canvas } from '../../../entities/canvas/canvas-schema';
import { snapshotOnExecute } from '../../../utils/canvas/snapshot-on-execute';
import { db } from '../../db/db';

export type PutCanvasParams = {
  data: Canvas;
};

export const putCanvas = async ({ data }: PutCanvasParams) => {
  return await snapshotOnExecute(() => {
    return db.canvases.put(data);
  }, data.canvasId);
};
