import { z } from "zod";

export const GalleryItemBaseSchema = z.object({
  galleryItemId: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export type GalleryItemBase = z.infer<typeof GalleryItemBaseSchema>;
