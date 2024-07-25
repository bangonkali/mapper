import { db } from '../../db/db';

export type FetchCanvasParams = {
  canvasId: string;
};

export const fetchCanvas = async (params: FetchCanvasParams) => {
  const { canvasId } = params;
  const canvas = await db.canvases.where('canvasId').equals(canvasId).first();
  return canvas;
};
