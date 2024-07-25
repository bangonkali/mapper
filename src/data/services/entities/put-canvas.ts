import { Canvas } from '../../../entities/canvas/canvas-schema';
import { db } from '../../db/db';

export type PutCanvasParams = {
  data: Canvas;
};

export const putCanvas = async ({ data }: PutCanvasParams) => {
  const canvases = await db.canvases.put(data);
  return canvases;
};
