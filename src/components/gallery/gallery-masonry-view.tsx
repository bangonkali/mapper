import createJustifiedLayout from "justified-layout";
import { useStore } from "@tanstack/react-store";
import { GalleryItemThumbnail } from "./gallery-item-thumbnail";
import { GalleryWorkspaceView } from "../../models/app/app-layout";
import { galleryMasonryLayoutStore } from "../../data/store/gallery-masonry-layout-store";
import { GalleryItem } from "../../entities/gallery-item/gallery-item-schema";
import { useGalleryItemsQuery } from "../../data/react-query/queries/use-gallery-items-query";
import { useRef } from "react";
import { focusedImageStore } from "../../data/store/gallery-items-store";

export type GalleryMasonryViewProps = {
  width: number;
  height: number;
  view: GalleryWorkspaceView;
};

export const GalleryMasonryView: React.FC<GalleryMasonryViewProps> = (
  props
) => {
  const focusedImageId = useStore(focusedImageStore);
  const galleryRef = useRef(null);
  const galleryItemsQuery = useGalleryItemsQuery();
  const masonryLayoutConfiguration = useStore(
    galleryMasonryLayoutStore,
    (state) => {
      return state;
    }
  );
  const items: GalleryItem[] = galleryItemsQuery.data ?? [];
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
  const scrollToElement = () => {
    const { current } = focusElement;
    if (current !== null) {
      current.scrollIntoView({ behavior: "smooth" });
    }
  };
  if (focusedImageId !== null) {
    scrollToElement();
  }
  const masonry = items.map((item, index) => {
    const focused = item.galleryItemId === focusedImageId;
    return (
      <GalleryItemThumbnail
        key={`thumb-${item.galleryItemId}`}
        item={item}
        layout={layout.boxes[index]}
        focused={focused}
        ref={focusElement}
      />
    );
  });

  return (
    <div
      ref={galleryRef}
      className="ns"
      style={{
        height: layout.containerHeight,
        width: props.width,
        position: "relative",
        left: 0,
        top: 0,
      }}
    >
      {masonry}
    </div>
  );
};
