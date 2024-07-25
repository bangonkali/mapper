import Dexie, { type EntityTable } from 'dexie';
import { Annotation } from '../../entities/annotation/annotation-schema';
import { Canvas } from '../../entities/canvas/canvas-schema';
import { AnnotationTag } from '../../entities/annotation/annotation-tag-schema';

const db = new Dexie('db') as Dexie & {
  canvases: EntityTable<Canvas, 'canvasId'>;
  annotations: EntityTable<Annotation, 'annotationId'>;
  annotationTags: EntityTable<AnnotationTag, 'annotationTagId'>;
};

db.version(1).stores({
  canvases: 'canvasId,createdAt,updatedAt',
  annotations:
    'annotationId,canvasId,[annotationId+canvasId],createdAt,updatedAt',
  annotationTags:
    'annotationTagId,[annotationId+canvasId],canvasId,createdAt,updatedAt',
});

export { db };
