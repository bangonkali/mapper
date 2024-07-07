import { useStore } from "@tanstack/react-store";
import { useRef } from "react";
import { Stage, Layer } from "react-konva";
import { produce } from "immer";
import Konva from "konva";
import { GalleryEditAnnotationRectangle } from "./gallery-edit-annotation-rectangle";
import useImage from "use-image";
import { GalleryEditFocusedItem } from "./gallery-edit-focused-item";
import { useAnnotationsQuery } from "../../data/react-query/queries/use-annotations-query";
import { usePutAnnotation } from "../../data/react-query/mutations/use-put-annotation";
import { GalleryItem } from "../../entities/gallery-item/gallery-item-schema";
import { gallerySelectedAnnotationStore } from "../../data/store/gallery-items-store";
import { usePutGalleryItem } from "../../data/react-query/mutations/use-put-gallery-item";

export type GalleryEditCavnasProps = {
  focusedImage: GalleryItem;
  width: number;
  height: number;
};

export const GalleryEditCavnas: React.FC<GalleryEditCavnasProps> = ({
  focusedImage,
  width,
  height,
}) => {
  const putGalleryItem = usePutGalleryItem();
  const mutateAnnotation = usePutAnnotation();
  const stageRef = useRef<Konva.Stage>(null);
  const gallerySelectedAnnotation = useStore(gallerySelectedAnnotationStore);
  const [image] = useImage(focusedImage.src);

  const annotationQuery = useAnnotationsQuery({
    galleryItemId: focusedImage.galleryItemId,
  });

  const zoomFactor = focusedImage.zoomFactor;

  const padding = 10;

  const allocatedWidth = width - padding * 2;
  const allocatedHeight = height - padding * 2;

  const scaleFactor = Math.min(
    allocatedWidth / focusedImage.width,
    allocatedHeight / focusedImage.height
  );

  const virtualWidth = Math.floor(focusedImage.width * scaleFactor);
  const virtualHeight = Math.floor(focusedImage.height * scaleFactor);

  const isPortrait = focusedImage.height > focusedImage.width;

  const localImagePositionX = isPortrait
    ? Math.floor((allocatedWidth - virtualWidth) / 2) + padding
    : padding;
  const localImagePositionY = isPortrait
    ? padding
    : Math.floor((allocatedHeight - virtualHeight) / 2) + padding;

  const localImagePosition = {
    x: localImagePositionX,
    y: localImagePositionY,
  };

  const annotations = annotationQuery.data?.map((annotation) => {
    return (
      <GalleryEditAnnotationRectangle
        key={annotation.annotationId}
        annotation={annotation}
        isSelected={annotation.annotationId === gallerySelectedAnnotation}
        onSelect={() => {
          gallerySelectedAnnotationStore.setState(
            () => annotation.annotationId
          );
        }}
        onChange={(e) => {
          mutateAnnotation.mutate({
            data: {
              ...annotation,
              height: e.height,
              width: e.width,
              x: e.x,
              y: e.y,
              rotation: e.rotation,
            },
          });
        }}
      />
    );
  });

  const scaleBy = 1.15;

  return (
    <Stage
      key={`stage-${focusedImage.galleryItemId}`}
      useRef={stageRef}
      position={localImagePosition}
      width={width}
      height={height}
      onClick={() => {
        if (stageRef.current === null) {
          return;
        }
      }}
      onWheel={(e) => {
        // if (stageRef.current === null) {
        //   return;
        // }
        // const stage = stageRef.current;

        // const pointer = stage.getPointerPosition();
        // if (pointer === null) {
        //   return;
        // }

        // const mousePointTo = {
        //   x: (pointer.x - stage.x()) / scaleBy,
        //   y: (pointer.y - stage.y()) / scaleBy,
        // };

        const direction = e.evt.deltaY > 0 ? 1 : -1;

        const newScale =
          direction > 0 ? zoomFactor * scaleBy : zoomFactor / scaleBy;

        // const newPos = {
        //   x: pointer.x - mousePointTo.x * newScale,
        //   y: pointer.y - mousePointTo.y * newScale,
        // };

        // setImagePosition(newPos);
        putGalleryItem.mutate({
          data: produce(focusedImage, (draft) => {
            draft.zoomFactor = newScale;
          }),
        });
      }}
    >
      <Layer
        scale={{ x: scaleFactor * zoomFactor, y: scaleFactor * zoomFactor }}
      >
        <GalleryEditFocusedItem image={image} />
        {annotations}
      </Layer>
    </Stage>
  );
};
