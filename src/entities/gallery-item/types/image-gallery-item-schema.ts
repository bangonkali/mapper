import { z } from 'zod';
import { GalleryItemBaseSchema } from '../gallery-item-base-schema';

export const ImageGalleryItemSchema = GalleryItemBaseSchema.extend({
  type: z.literal('image'),
  width: z.number(),
  height: z.number(),
  src: z.string(),
  selected: z.boolean(),
  ratio: z.number(),
  caption: z.string(),
  zoomFactor: z.number(),
});

export type ImageGalleryItem = z.infer<typeof ImageGalleryItemSchema>;
