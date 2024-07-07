import { useEffect, useRef } from "react";
import styles from "./gallery-edit-carousel.module.css";
import { GalleryEditCarouselThumbnail } from "./gallery-edit-carousel-thumbnail";
import { colors } from "../../consts/colors";
import { GalleryItem } from "../../entities/gallery-item/gallery-item-schema";

export type GalleryEditCarouselProps = {
  items: GalleryItem[];
  focusedItem: GalleryItem;
  height: number;
};

export const GalleryEditCarousel: React.FC<GalleryEditCarouselProps> = ({
  items,
  focusedItem,
  height,
}) => {
  const focusElement = useRef<HTMLImageElement>(null);

  const topBorder = 1;
  const scrollbarHeight = 6;

  const scrollToElement = () => {
    const { current } = focusElement;
    if (current !== null) {
      current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToElement, []);
  const carousel = items.map((item) => {
    const focused = item.galleryItemId === focusedItem.galleryItemId;
    const imgHeight = Math.ceil(height - scrollbarHeight - topBorder);
    const imgWidth = Math.ceil((imgHeight * item.width) / item.height);

    return (
      <GalleryEditCarouselThumbnail
        key={item.galleryItemId}
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
        overflowX: "auto",
        overflowY: "hidden",
        display: "flex",
        flexDirection: "row",
        borderTop: `${topBorder}px solid ${colors.borders}`,
      }}
    >
      {carousel}
    </div>
  );
};
