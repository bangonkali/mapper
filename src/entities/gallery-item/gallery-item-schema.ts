import { ImageGalleryItemSchema } from "./types/image-gallery-item-schema";
import { z } from "zod";

export const GalleryItemSchema = z.discriminatedUnion("type", [
  ImageGalleryItemSchema,
]);

export type GalleryItem = z.infer<typeof GalleryItemSchema>;
