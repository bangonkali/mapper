import { generateMockData } from '../../../utils/mock/mock-datasource';
import { db } from '../../db/db';

export const fetchCanvases = async () => {
  await generateMockData();
  const canvases = await db.canvases.orderBy('createdAt').toArray();
  return canvases;
};
