import { useStore } from "@tanstack/react-store";
import { GalleryComputedLayout } from "../../models/app/app-layout";
import { GalleryEditCarousel } from "./gallery-edit-carousel";
import { GalleryEditCavnas } from "./gallery-edit-canvas";
import { GalleryEditToolbar } from "./gallery-edit-toolbar";
import { focusedImageStore } from "../../data/store/gallery-items-store";
import { useGalleryItemsQuery } from "../../data/react-query/queries/use-gallery-items-query";
import { GalleryItem } from "../../entities/gallery-item/gallery-item-schema";

export type GalleryEditViewProps = {
  layout: GalleryComputedLayout;
};

export const GalleryEditView: React.FC<GalleryEditViewProps> = ({ layout }) => {
  const galleryItemsQuery = useGalleryItemsQuery();
  const focusedImageId = useStore(focusedImageStore);

  const carouselHeight = 60;
  const toolbarHeight = 40;
  const canvasHeight =
    layout.docks.workspace.height - carouselHeight - toolbarHeight;
  const items: GalleryItem[] = galleryItemsQuery.data ?? [];
  const focusedImage = items.find(
    (item) => item.galleryItemId === focusedImageId
  );

  if (!focusedImage) {
    return <p>No item</p>;
  }

  if (items.length === 0) {
    return <p>No items</p>;
  }

  return (
    <div
      style={{
        display: "absolute",
        position: "absolute",
        left: 0,
        right: 0,
        height: layout.docks.workspace.height,
        width: layout.docks.workspace.width,
      }}
    >
      <div
        style={{
          height: toolbarHeight,
          width: layout.docks.workspace.width,
          left: 0,
          top: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <GalleryEditToolbar
          width={layout.docks.workspace.width}
          height={toolbarHeight}
        />
      </div>
      <div
        style={{
          left: 0,
          top: toolbarHeight,
          height: canvasHeight,
          width: layout.docks.workspace.width,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <GalleryEditCavnas
          focusedImage={focusedImage}
          width={layout.docks.workspace.width}
          height={canvasHeight}
        />
      </div>
      <div
        className="ns"
        style={{
          left: 0,
          top: layout.docks.workspace.height - carouselHeight,
          height: carouselHeight,
          width: layout.docks.workspace.width,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <GalleryEditCarousel
          items={items}
          height={carouselHeight}
          focusedItem={focusedImage}
        />
      </div>
    </div>
  );
};
