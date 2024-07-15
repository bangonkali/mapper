import { db } from "../../db/db";

export type FetchAnnotationsParams = {
  galleryItemId: string;
};

export const fetchAnnotations = async (params: FetchAnnotationsParams) => {
  const { galleryItemId } = params;
  if (!galleryItemId) return [];
  const annotations = await db.annotations
    .where("galleryItemId")
    .equals(galleryItemId)
    .sortBy("createdAt");

  return annotations;
};
