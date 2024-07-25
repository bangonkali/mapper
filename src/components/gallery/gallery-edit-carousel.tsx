import { useEffect, useRef } from 'react';
import styles from './gallery-edit-carousel.module.css';
import { GalleryEditCarouselThumbnail } from './gallery-edit-carousel-thumbnail';
import { colors } from '../../consts/colors';
import { Canvas } from '../../entities/canvas/canvas-schema';

export type GalleryEditCarouselProps = {
  items: Canvas[];
  focusedItem: Canvas;
  height: number;
  width: number;
};

export const GalleryEditCarousel: React.FC<GalleryEditCarouselProps> = ({
  items,
  focusedItem,
  height,
  width,
}) => {
  const focusElement = useRef<HTMLImageElement>(null);

  const topBorder = 1;
  const scrollbarHeight = 6;

  const scrollToElement = () => {
    const { current } = focusElement;
    if (current !== null) {
      current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(scrollToElement, []);
  const carousel = items.map((item) => {
    const focused = item.canvasId === focusedItem.canvasId;
    const imgHeight = Math.ceil(height - scrollbarHeight - topBorder);
    const imgWidth = Math.ceil((imgHeight * item.width) / item.height);

    return (
      <GalleryEditCarouselThumbnail
        key={item.canvasId}
        item={item}
        height={imgHeight}
        width={imgWidth}
        focused={focused}
        ref={focusElement}
      />
    );
  });

  return (
    <div
      className={styles.carousel}
      style={{
        height: height - topBorder,
        width: width,
        overflowX: 'auto',
        overflowY: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        borderTop: `${topBorder}px solid ${colors.border}`,
      }}
    >
      {carousel}
    </div>
  );
};
