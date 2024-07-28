import { Annotation } from '../../../entities/annotation/annotation-schema';
import { db } from '../../db/db';
import {
  currentAnnotationsStore,
  currentCanvasStore,
} from '../../store/active-canvas-store';

export type FetchCanvasAnnotationsParams = {
  canvasId: string;
};

export const fetchCanvasAnnotations = async ({
  canvasId,
}: FetchCanvasAnnotationsParams): Promise<Annotation[]> => {
  const start = Date.now();

  if (
    currentCanvasStore.state?.canvasId === canvasId &&
    currentAnnotationsStore.state.length > 0 &&
    currentAnnotationsStore.state[0].canvasId === canvasId
  ) {
    console.log(
      `Annotations:fetch ${currentAnnotationsStore.state.length} (cached ${canvasId}) ${Date.now() - start} ms`
    );
    return currentAnnotationsStore.state;
  }

  const annotations = await db.annotations
    .where('canvasId')
    .equals(canvasId)
    .sortBy('createdAt');

  // cache
  currentAnnotationsStore.setState(() => {
    return annotations;
  });

  console.log(
    `Annotations:fetch ${annotations.length} ${Date.now() - start} ms`
  );
  return annotations;
};
