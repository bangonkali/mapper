import { GalleryItem } from "../../../entities/gallery-item/gallery-item-schema";
import { db } from "../../db/db";

export type PutGalleryItemParams = {
  data: GalleryItem;
};

export const putGalleryItems = async ({ data }: PutGalleryItemParams) => {
  const galleryItems = await db.galleryItems.put(data);
  return galleryItems;
};
