import createJustifiedLayout from 'justified-layout';
import { GalleryItem } from '../../entities/gallery-item/gallery-item-schema';

export const calculateMasonryLayout = (width: number, items: GalleryItem[]) => {
  const ratios = items.map((item) => item.ratio);
  const layout = createJustifiedLayout(ratios, {
    containerWidth: width,
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

  return layout;
};
