import { db } from "../../db/db";

export const fetchGalleryItems = async () => {
  const galleryItems = await db.galleryItems.toArray();
  return galleryItems;
};
