import { useStore } from "@tanstack/react-store";
import { GalleryComputedLayout } from "../../models/app/app-layout";
import { GalleryEditCarousel } from "./gallery-edit-carousel";
import { GalleryEditCavnas } from "./gallery-edit-canvas";
import { GalleryEditToolbar } from "./gallery-edit-toolbar";
import { focusedImageStore } from "../../data/store/gallery-items-store";
import { useGalleryItemsQuery } from "../../data/react-query/queries/use-gallery-items-query";
import { GalleryItem } from "../../entities/gallery-item/gallery-item-schema";

import { usePutAnnotation } from "../../data/react-query/mutations/use-put-annotation";
import { v4 as uuid } from "uuid";
import HexRandomColorHook from "../../Hooks/HexRandomColorHook";
import { useAnnotationsQuery } from "../../data/react-query/queries/use-annotations-query";

import { useCallback } from "react";
export type GalleryEditViewProps = {
  layout: GalleryComputedLayout;
};

import { MdSquare } from "react-icons/md";
import { MdRectangle } from "react-icons/md";

import "./gallery-edit-view.css"; // Example CSS for styling the button group

export const GalleryEditView: React.FC<GalleryEditViewProps> = ({ layout }) => {
  const galleryItemsQuery = useGalleryItemsQuery();
  const focusedImageId = useStore(focusedImageStore);
  const mutateAnnotation = usePutAnnotation();
  const annotationQuery = useAnnotationsQuery({
    galleryItemId: focusedImageId!,
  });

  const shapes = {
    rectangle: "rectangle",
    square: "square",
  };
  const [generateOutline, generateRandomHexColor] = HexRandomColorHook();
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

  const handleSubmitShape = useCallback(
    (selectedShape: string) => {
      const newUuid = uuid();
      const hexColor = generateRandomHexColor();
      const outlineHexColor = generateOutline();

      const lastElement = annotationQuery.data?.length! - 1;
      let height = annotationQuery.data![lastElement].height;
      let width = annotationQuery.data![lastElement].width;
      let rotation = 0.0;
      let shape: "rectangle" | "square";
      if (selectedShape === shapes.square) {
        height = 85;
        width = 85;
        shape = "square";
      } else {
        height = annotationQuery.data![lastElement].height;
        width = annotationQuery.data![lastElement].width;
        shape = "rectangle";
      }
      mutateAnnotation.mutate({
        data: {
          galleryItemId: focusedImageId!,
          annotationId: newUuid,
          height: height,
          width: width,
          title: " ",
          description: " ",
          type: shape,
          frame: 0.0,
          rotation: rotation,
          x: 200,
          y: annotationQuery.data![lastElement]!.y,
          fill: {
            color: hexColor.toString(),
            alpha: 0.5,
          },
          outline: {
            brush: {
              color: outlineHexColor.toString(),
              alpha: 0.5,
            },
            thickness: 2.0,
          },
        },
      });
    },
    [annotationQuery]
  );

  return (
    <div
      style={{
        display: "absolute",
        position: "absolute",
        left: 0,
        right: 0,
        height: `${layout.docks.workspace.height}px`,
        width: `${layout.docks.workspace.width}px`,
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
          children={
            <div className="gallery-add-new-shape-container">
              <button
                className={`gallery-add-new-shape-buttons`}
                onClick={() => handleSubmitShape("rectangle")}
              >
                <MdRectangle />
                Rectangle
              </button>
              <button
                className="gallery-add-new-shape-buttons"
                onClick={() => handleSubmitShape("square")}
              >
                <MdSquare />
                Square
              </button>
            </div>
          }
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
