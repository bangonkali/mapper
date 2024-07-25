import { useStore } from '@tanstack/react-store';
import { useRef } from 'react';
import { Stage, Layer } from 'react-konva';
import { produce } from 'immer';
import Konva from 'konva';
import { GalleryEditAnnotationRectangle } from './gallery-edit-annotation-rectangle';
import useImage from 'use-image';
import { GalleryEditFocusedCanvas } from './gallery-edit-focused-canvas';
import { useAnnotationsQuery } from '../../data/react-query/queries/use-annotations-query';
import { usePutAnnotation } from '../../data/react-query/mutations/use-put-annotation';
import { Canvas } from '../../entities/canvas/canvas-schema';
import { gallerySelectedAnnotationStore } from '../../data/store/canvases-store';
import { usePutCanvas } from '../../data/react-query/mutations/use-put-canvas';

export type GalleryEditCanvasProps = {
  focusedImage: Canvas;
  width: number;
  height: number;
};

export const GalleryEditCanvas: React.FC<GalleryEditCanvasProps> = ({
  focusedImage,
  width,
  height,
}) => {
  const putCanvas = usePutCanvas();
  const mutateAnnotation = usePutAnnotation();
  const stageRef = useRef<Konva.Stage>(null);
  const gallerySelectedAnnotation = useStore(gallerySelectedAnnotationStore);
  const [image] = useImage(focusedImage.src);

  const annotationQuery = useAnnotationsQuery({
    canvasId: focusedImage.canvasId,
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

  const annotations = annotationQuery.data
    ?.filter((x) => x.visible)
    .map((annotation) => {
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
      key={`stage-${focusedImage.canvasId}`}
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
        putCanvas.mutate({
          data: produce(focusedImage, (draft) => {
            draft.zoomFactor = newScale;
          }),
        });
      }}
    >
      <Layer
        scale={{ x: scaleFactor * zoomFactor, y: scaleFactor * zoomFactor }}
      >
        <GalleryEditFocusedCanvas image={image} />
        {annotations}
      </Layer>
    </Stage>
  );
};
