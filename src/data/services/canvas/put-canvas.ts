import { Canvas } from '../../../entities/canvas/canvas-schema';
import { db } from '../../db/db';
import { createSnapshot } from '../snapshots/create-snapshot';

export type PutCanvasParams = {
  data: Canvas;
};

export const putCanvas = async ({ data }: PutCanvasParams) => {
  // create a snapshot
  await createSnapshot({ canvasId: data.canvasId });

  // put the canvas
  const canvases = await db.canvases.put(data);
  return canvases;
};
