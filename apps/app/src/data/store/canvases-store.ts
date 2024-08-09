import { Store } from '@tanstack/react-store';

export const galleryReadyStore = new Store<boolean>(false);

export const gallerySelectedAnnotationStore = new Store<string | null>(null);

export type CanvasEphemeralState = {
  [key: string]: {
    zoomFactor: number;
  };
};

export const galleryCanvasEpehemeralStateStore =
  new Store<CanvasEphemeralState>({});
