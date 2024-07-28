import { useStore } from '@tanstack/react-store';
import { useRef } from 'react';
import { Stage, Layer } from 'react-konva';
import { produce } from 'immer';
import Konva from 'konva';
import { GalleryEditAnnotationRectangle } from './gallery-edit-annotation-rectangle';
import useImage from 'use-image';
import { GalleryEditFocusedCanvas } from './gallery-edit-focused-canvas';
import { usePutAnnotation } from '../../data/react-query/mutations/use-put-annotation';
import { Canvas } from '../../entities/canvas/canvas-schema';
import {
  galleryCanvasEpehemeralStateStore,
  gallerySelectedAnnotationStore,
} from '../../data/store/canvases-store';
import { currentAnnotationsStore } from '../../data/store/active-canvas-store';

export type GalleryEditCanvasProps = {
  canvas: Canvas;
  width: number;
  height: number;
};

export const GalleryEditCanvas: React.FC<GalleryEditCanvasProps> = ({
  canvas,
  width,
  height,
}) => {
  const mutateAnnotation = usePutAnnotation();
  const stageRef = useRef<Konva.Stage>(null);
  const gallerySelectedAnnotation = useStore(gallerySelectedAnnotationStore);
  const canvasState = useStore(galleryCanvasEpehemeralStateStore, (store) => {
    return store[canvas.canvasId] ?? { zoomFactor: 1 };
  });
  const [image] = useImage(canvas.src);
  const annotations = useStore(currentAnnotationsStore, (state) => {
    return state.filter((c) => c.canvasId === canvas.canvasId);
  });

  const padding = 10;

  const allocatedWidth = width - padding * 2;
  const allocatedHeight = height - padding * 2;

  const scaleFactor = Math.min(
    allocatedWidth / canvas.width,
    allocatedHeight / canvas.height
  );

  const virtualWidth = Math.floor(canvas.width * scaleFactor);
  const virtualHeight = Math.floor(canvas.height * scaleFactor);

  const isPortrait = canvas.height > canvas.width;

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

  const visibleAnnotations = annotations
    .filter((x) => {
      const visible = x.visible;
      const hasChildren = annotations.some(
        (y) => y.parentAnnotationId === x.annotationId
      );
      return visible && !hasChildren;
    })
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
      key={`stage-${canvas.canvasId}`}
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
          direction > 0
            ? canvasState.zoomFactor * scaleBy
            : canvasState.zoomFactor / scaleBy;

        // const newPos = {
        //   x: pointer.x - mousePointTo.x * newScale,
        //   y: pointer.y - mousePointTo.y * newScale,
        // };

        // setImagePosition(newPos);
        galleryCanvasEpehemeralStateStore.setState((state) => {
          return produce(state, (draft) => {
            draft[canvas.canvasId] = {
              zoomFactor: newScale,
            };
          });
        });
      }}
    >
      <Layer
        scale={{
          x: scaleFactor * canvasState.zoomFactor,
          y: scaleFactor * canvasState.zoomFactor,
        }}
      >
        <GalleryEditFocusedCanvas image={image} />
        {visibleAnnotations}
      </Layer>
    </Stage>
  );
};
