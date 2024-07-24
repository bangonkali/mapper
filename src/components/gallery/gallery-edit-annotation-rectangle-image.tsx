import { Annotation } from '../../entities/annotation/annotation-schema';
import { Image } from 'react-konva';
import { forwardRef } from 'react';
import Konva from 'konva';
import useImage from 'use-image';
import { KonvaEventObject } from 'konva/lib/Node';

export type GalleryEditAnnotationRectangleImageProps = {
  annotation: Annotation;
  isSelected: boolean;
  imgSrc: string;
  onSelect: (evt: KonvaEventObject<MouseEvent>) => void;
  onTransform?(evt: Konva.KonvaEventObject<Event>): void;
  onTransformEnd?(evt: Konva.KonvaEventObject<Event>): void;
  onDragEnd?(evt: Konva.KonvaEventObject<DragEvent>): void;
};

export const GalleryEditAnnotationRectangleImage = forwardRef<
  Konva.Image,
  GalleryEditAnnotationRectangleImageProps
>(
  (
    {
      annotation,
      isSelected,
      imgSrc,
      onSelect,
      onTransform,
      onTransformEnd,
      onDragEnd,
    },
    shapeRef
  ) => {
    const [image] = useImage(imgSrc);
    return (
      <Image
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        x={annotation.x}
        y={annotation.y}
        width={annotation.width}
        height={annotation.height}
        rotation={annotation.rotation}
        draggable={isSelected}
        strokeScaleEnabled={false}
        image={image}
        onDragEnd={onDragEnd}
        onTransform={onTransform}
        onTransformEnd={onTransformEnd}
      />
    );
  }
);
