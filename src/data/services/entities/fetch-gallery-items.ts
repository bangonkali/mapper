import { generateMockData } from '../../../utils/mock/mock-datasource';
import { db } from '../../db/db';

export const fetchGalleryItems = async () => {
  await generateMockData();
  const galleryItems = await db.galleryItems.orderBy('createdAt').toArray();
  return galleryItems;
};
