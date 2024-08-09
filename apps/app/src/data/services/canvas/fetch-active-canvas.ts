import { currentCanvasStore } from '../../store/active-canvas-store';
import { fetchCanvasAnnotations } from '../annotations/fetch-canvas-annotations';
import { fetchCanvas } from './fetch-canvas';

export type FetchActiveCanvasParams = {
  canvasId: string;
};

export const fetchActiveCanvas = async ({
  canvasId,
}: FetchActiveCanvasParams) => {
  const canvas = await fetchCanvas({ canvasId });
  if (canvas) {
    currentCanvasStore.setState(() => {
      return canvas;
    });

    await fetchCanvasAnnotations({ canvasId });
    return canvas;
  }

  return undefined;
};
