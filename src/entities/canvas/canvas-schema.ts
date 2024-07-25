import { DocumentCanvasSchema } from './types/document-canvas-schema';
import { z } from 'zod';

export const CanvasSchema = z.discriminatedUnion('type', [
  DocumentCanvasSchema,
]);

export type Canvas = z.infer<typeof CanvasSchema>;
