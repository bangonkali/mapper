import { Store } from '@tanstack/react-store';

export const galleryReadyStore = new Store<boolean>(false);

export const gallerySelectedAnnotationStore = new Store<string | null>(null);

export type GalleryEditorState = {
  zoomFactor: number;
};
