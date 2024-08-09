import createJustifiedLayout from 'justified-layout';
import { useStore } from '@tanstack/react-store';
import { CanvasThumbnail } from './canvas-thumbnail';
import { galleryMasonryLayoutStore } from '../../data/store/gallery-masonry-layout-store';
import { Canvas } from '../../entities/canvas/canvas-schema';
import { useCanvasesQuery } from '../../data/react-query/queries/use-canvases-query';
import { useRef } from 'react';

export type GalleryMasonryViewProps = {
  width: number;
  height: number;
};

export const GalleryMasonryView: React.FC<GalleryMasonryViewProps> = (
  props
) => {
  const galleryRef = useRef(null);
  const canvasesQuery = useCanvasesQuery();
  const masonryLayoutConfiguration = useStore(
    galleryMasonryLayoutStore,
    (state) => {
      return state;
    }
  );
  const items: Canvas[] = canvasesQuery.data ?? [];
  const focusElement = useRef<HTMLImageElement>(null);

  if (items.length === 0) {
    return <p>No items</p>;
  }

  const layout = createJustifiedLayout(
    items.map((item) => item.ratio),
    {
      containerWidth: props.width,
      ...masonryLayoutConfiguration,
    }
  );
  const masonry = items.map((item, index) => {
    return (
      <CanvasThumbnail
        key={`thumb-${item.canvasId}`}
        item={item}
        layout={layout.boxes[index]}
        focused={false}
        ref={focusElement}
      />
    );
  });

  return (
    <div
      ref={galleryRef}
      style={{
        height: layout.containerHeight,
        width: props.width,
        position: 'relative',
        left: 0,
        top: 0,
      }}
    >
      {masonry}
    </div>
  );
};
