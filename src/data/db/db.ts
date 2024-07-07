import Dexie, { type EntityTable } from "dexie";
import { Annotation } from "../../entities/annotation/annotation-schema";
import { GalleryItem } from "../../entities/gallery-item/gallery-item-schema";

const db = new Dexie("db") as Dexie & {
  galleryItems: EntityTable<GalleryItem, "galleryItemId">;
  annotations: EntityTable<Annotation, "annotationId">;
};

db.version(1).stores({
  galleryItems: "++galeryItems",
  annotations: "++annotationId,galleryItemId,[annotationId+galleryItemId]",
});

export { db };
