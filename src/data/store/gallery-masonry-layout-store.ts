import { Store } from '@tanstack/react-store';

export const galleryMasonryLayoutStore = new Store({
  containerPadding: {
    top: 4,
    right: 4,
    bottom: 4,
    left: 5,
  },
  boxSpacing: {
    horizontal: 4,
    vertical: 4,
  },
  targetRowHeight: 150,
});
