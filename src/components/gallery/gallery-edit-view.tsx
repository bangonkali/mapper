import { GalleryComputedLayout } from "../../models/app/app-layout";
import { useGalleryItemsQuery } from "../../data/react-query/queries/use-gallery-items-query";
import { useAnnotationsQuery } from "../../data/react-query/queries/use-annotations-query";
import { GalleryEditCarousel } from "./gallery-edit-carousel";
import { GalleryEditToolbar } from "./gallery-edit-toolbar";
import { GalleryEditCavnas } from "./gallery-edit-canvas";
import { usePutAnnotation } from "../../data/react-query/mutations/use-put-annotation";
import { RectangleShape } from "../shapes/rectangle-shape";
import { getRandomColor } from "../../utils/random/random-utils";
import { GalleryItem } from "../../entities/gallery-item/gallery-item-schema";
import { useCallback } from "react";
import { v4 as uuid } from "uuid";
import { colors } from "../../consts/colors";
import { Route } from "../../routes/gallery.item.$galleryItemId.lazy";
import { galleryStoreLayout } from "../../data/store/gallery-store";
import { produce } from "immer";
import { onSplitterEnd } from "../../data/store/mutations/splitter/on-splitter-end";

export type GalleryEditViewProps = {
  layout: GalleryComputedLayout;
};

export const GalleryEditView: React.FC<GalleryEditViewProps> = ({ layout }) => {
  const { galleryItemId } = Route.useParams();
  const galleryItemsQuery = useGalleryItemsQuery();
  const focusedImageId = galleryItemId;
  const mutateAnnotation = usePutAnnotation();
  const annotationQuery = useAnnotationsQuery({
    galleryItemId: focusedImageId!,
  });

  const toolbarHeight = 40;
  const canvasHeight =
    layout.docks.workspace.height - layout.docks.bottom.height - toolbarHeight;
  const items: GalleryItem[] = galleryItemsQuery.data ?? [];
  const focusedImage = items.find(
    (item) => item.galleryItemId === focusedImageId
  );

  const handleSubmitShape = useCallback(() => {
    if (typeof annotationQuery.data?.length !== "number") return;
    if (!focusedImageId) return;

    const newUuid = uuid();
    const hexColor = getRandomColor();
    const outlineHexColor = getRandomColor();
    let height = 50;
    let width = 50;
    let x = 50;
    let y = 50;

    let lastElementIndex = annotationQuery.data?.length - 1;
    if (lastElementIndex >= 0) {
      const lastElement = annotationQuery.data![lastElementIndex];
      height = lastElement.height;
      width = lastElement.width;
      x = lastElement.x + 25;
      y = lastElement.y + 25;
    } else {
      lastElementIndex = 0;
    }

    mutateAnnotation.mutate({
      data: {
        galleryItemId: focusedImageId,
        annotationId: newUuid,
        height: height,
        width: width,
        title: `Annotation #${lastElementIndex + 1}`,
        description: `Description for Item ${focusedImageId} - ${lastElementIndex + 1}`,
        type: "rectangle",
        frame: 0.0,
        rotation: 0,
        x: x,
        y: y,
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
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        visible: true,
      },
    });
  }, [annotationQuery.data, focusedImageId, mutateAnnotation]);

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
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              height: 36,
              backgroundColor: "white",
              paddingLeft: 10,
              paddingRight: 10,
            }}
            onMouseOver={() => {}}
            onClick={() => handleSubmitShape()}
          >
            <RectangleShape
              width={16}
              height={16}
              fill={"white"}
              stroke={colors.headerForeground}
            />
            <p
              style={{
                marginLeft: 10,
              }}
            >
              Add Rectangle
            </p>
          </div>
        </GalleryEditToolbar>
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
          top: 0,
          height: layout.docks.bottom.height,
          width: layout.docks.workspace.width,
          position: "relative",
        }}
      >
        <div
          id="dock-bottom-container"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: layout.docks.workspace.width,
            height: layout.docks.bottom.height,
          }}
        >
          <GalleryEditCarousel
            items={items}
            height={layout.docks.bottom.height}
            focusedItem={focusedImage}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: layout.docks.workspace.width,
            height: 3,
            cursor: "row-resize",
            backgroundColor: layout.docks.bottom.splitterVisible
              ? colors.splitter
              : "transparent",
          }}
          onMouseLeave={() => {
            if (!layout.docks.bottom.splitterEnabled) {
              onSplitterEnd(galleryStoreLayout);
            }
          }}
          onMouseOver={() => {
            galleryStoreLayout.setState((state) => {
              return produce(state, (draft) => {
                draft.gallery.layout.constraint.docks.bottom.splitterVisible =
                  true;
              });
            });
          }}
          onMouseDown={() => {
            galleryStoreLayout.setState((state) => {
              return produce(state, (draft) => {
                draft.gallery.layout.constraint.docks.bottom.splitterEnabled =
                  true;
              });
            });
          }}
        ></div>
      </div>
    </div>
  );
};
