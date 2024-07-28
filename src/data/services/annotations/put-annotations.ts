import { Annotation } from '../../../entities/annotation/annotation-schema';
import { snapshotOnExecute } from '../../../utils/canvas/snapshot-on-execute';
import { db } from '../../db/db';
import {
  currentAnnotationsStore,
  currentCanvasStore,
} from '../../store/active-canvas-store';

export type PutAnnotationParams = {
  data: Annotation;
};

export const putAnnotations = async ({ data }: PutAnnotationParams) => {
  const start = Date.now();

  // fast-non async cache
  if (currentCanvasStore.state?.canvasId === data.canvasId) {
    currentAnnotationsStore.setState((prev) => {
      const index = prev.findIndex((c) => c.annotationId === data.annotationId);
      if (index >= 0) {
        prev[index] = data;
      } else {
        prev.push(data);
      }
      return prev;
    });
  }

  const finishCache = Date.now();

  // async persistence layer
  const response = await snapshotOnExecute(() => {
    return db.annotations.put(data);
  }, data.canvasId);

  console.log(
    `Annotation:put in ${Date.now() - start} ms (${finishCache - start} ms)`
  );
  return response;
};
