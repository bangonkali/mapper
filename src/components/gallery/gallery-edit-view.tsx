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

import "./gallery-edit-view.css"; // Example CSS for styling the button group
import { RectangleShape } from "../shapes/rectangle-shape";

export const GalleryEditView: React.FC<GalleryEditViewProps> = ({ layout }) => {
  const galleryItemsQuery = useGalleryItemsQuery();
  const focusedImageId = useStore(focusedImageStore);
  const mutateAnnotation = usePutAnnotation();
  const annotationQuery = useAnnotationsQuery({
    galleryItemId: focusedImageId!,
  });

  const [generateOutline, generateRandomHexColor] = HexRandomColorHook();
  const carouselHeight = 60;
  const toolbarHeight = 40;
  const canvasHeight =
    layout.docks.workspace.height - carouselHeight - toolbarHeight;
  const items: GalleryItem[] = galleryItemsQuery.data ?? [];
  const focusedImage = items.find(
    (item) => item.galleryItemId === focusedImageId
  );

  const handleSubmitShape = useCallback(() => {
    if (typeof annotationQuery.data?.length !== "number") return;

    const newUuid = uuid();
    const hexColor = generateRandomHexColor();
    const outlineHexColor = generateOutline();
    const lastElement = annotationQuery.data?.length - 1;
    const height = annotationQuery.data![lastElement].height;
    const width = annotationQuery.data![lastElement].width;
    mutateAnnotation.mutate({
      data: {
        galleryItemId: focusedImageId!,
        annotationId: newUuid,
        height: height,
        width: width,
        title: " ",
        description: " ",
        type: "rectangle",
        frame: 0.0,
        rotation: 0,
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
        createdAt: new Date().getTime(), // current time
        updatedAt: new Date().getTime(), // Add updatedAt property
        visible: true, // Add the visible property
      },
    });
  }, [
    annotationQuery.data,
    focusedImageId,
    generateOutline,
    generateRandomHexColor,
    mutateAnnotation,
  ]);

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
          children={
            <div className="gallery-add-new-shape-container">
              <button
                className={`gallery-add-new-shape-buttons`}
                onClick={() => handleSubmitShape()}
              >
                <RectangleShape
                  width={6}
                  height={12}
                  fill={"orange"}
                  stroke={"white"}
                />
                Rectangle
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
