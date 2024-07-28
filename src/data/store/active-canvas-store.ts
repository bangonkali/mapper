import { Store } from '@tanstack/react-store';
import { Canvas } from '../../entities/canvas/canvas-schema';
import { Annotation } from '../../entities/annotation/annotation-schema';
import { AnnotationTag } from '../../entities/annotation/annotation-tag-schema';

export const currentCanvasStore = new Store<Canvas | null>(null);
export const currentAnnotationsStore = new Store<Annotation[]>([]);
export const currentAnnotationTagsStore = new Store<AnnotationTag[]>([]);
