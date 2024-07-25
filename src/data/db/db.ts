import Dexie, { type EntityTable } from 'dexie';
import { Annotation } from '../../entities/annotation/annotation-schema';
import { Canvas } from '../../entities/canvas/canvas-schema';
import { AnnotationTag } from '../../entities/annotation/annotation-tag-schema';
import { Snapshot } from '../../entities/snapshot/snapshot-schema';

const db = new Dexie('db') as Dexie & {
  canvases: EntityTable<Canvas, 'canvasId'>;
  annotations: EntityTable<Annotation, 'annotationId'>;
  annotationTags: EntityTable<AnnotationTag, 'annotationTagId'>;
  snapshots: EntityTable<Snapshot, 'snapshotId'>;
};

db.version(1).stores({
  canvases: 'canvasId,createdAt,updatedAt',
  annotations:
    'annotationId,canvasId,[annotationId+canvasId],createdAt,updatedAt',
  annotationTags:
    'annotationTagId,[annotationId+canvasId],canvasId,createdAt,updatedAt',
  snapshots: 'snapshotId,canvasId,createdAt',
});

export { db };
