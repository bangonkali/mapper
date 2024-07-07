import { db } from "../../db/db";

export type FetchGalleryItemParams = {
  galleryItemId: string;
};

export const fetchGalleryItem = async (params: FetchGalleryItemParams) => {
  const { galleryItemId } = params;
  const galleryItem = await db.galleryItems
    .where("galleryItemId")
    .equals(galleryItemId)
    .first();
  return galleryItem;
};
