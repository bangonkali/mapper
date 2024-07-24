import Dexie, { type EntityTable } from 'dexie';
import { Annotation } from '../../entities/annotation/annotation-schema';
import { GalleryItem } from '../../entities/gallery-item/gallery-item-schema';
import { AnnotationTag } from '../../entities/annotation/annotation-tag-schema';

const db = new Dexie('db') as Dexie & {
  galleryItems: EntityTable<GalleryItem, 'galleryItemId'>;
  annotations: EntityTable<Annotation, 'annotationId'>;
  annotationTags: EntityTable<AnnotationTag, 'annotationTagId'>;
};

db.version(1).stores({
  galleryItems: '++galleryItemId,createdAt,updatedAt',
  annotations:
    '++annotationId,galleryItemId,[annotationId+galleryItemId],createdAt,updatedAt',
  annotationTags:
    '++annotationTagId,[annotationId+galleryItemId],galleryItemId,createdAt,updatedAt',
  undoHistory: '++undoId',
});

export { db };
