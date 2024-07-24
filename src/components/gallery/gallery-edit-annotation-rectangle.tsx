import { GalleryEditAnnotationRectangleImage } from './gallery-edit-annotation-rectangle-image';
import { Annotation } from '../../entities/annotation/annotation-schema';
import crossSvg from '../../assets/materials/cross.svg';
import { KonvaEventObject } from 'konva/lib/Node';
import { Rect, Transformer } from 'react-konva';
import React, { useCallback } from 'react';
import Konva from 'konva';

export type AnnotationRectangleOnChanged = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
};

export type GalleryEditAnnotationRectangleProps = {
  annotation: Annotation;
  isSelected: boolean;
  onSelect: (evt: KonvaEventObject<MouseEvent>) => void;
  onChange: (evt: AnnotationRectangleOnChanged) => void;
};

export const GalleryEditAnnotationRectangle: React.FC<
  GalleryEditAnnotationRectangleProps
> = ({ annotation, isSelected, onSelect, onChange }) => {
  const annotationImageRef = React.useRef<Konva.Image>(null);
  const annotationRectRef = React.useRef<Konva.Rect>(null);

  const trRef = React.useRef<Konva.Transformer>(null);

  const onDragEnd = useCallback(
    (evt: Konva.KonvaEventObject<DragEvent>) => {
      onChange({
        x: evt.target.x(),
        y: evt.target.y(),
        rotation: evt.target.rotation(),
        width: annotation.width,
        height: annotation.height,
      });
    },
    [annotation.height, annotation.width, onChange]
  );

  const onTransform = useCallback((evt: Konva.KonvaEventObject<Event>) => {
    // https://konvajs.org/docs/select_and_transform/Ignore_Stroke_On_Transform.html
    const node = annotationRectRef.current ?? annotationImageRef.current;
    if (!node) return;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    const width = Math.max(5, evt.target.width() * scaleX);
    const height = Math.max(5, evt.target.height() * scaleY);

    node.scaleX(1);
    node.scaleY(1);
    node.width(width);
    node.height(height);
  }, []);

  const onTransformEnd = useCallback(
    (evt: Konva.KonvaEventObject<Event>) => {
      const node = annotationRectRef.current ?? annotationImageRef.current;
      if (!node) return;

      const scaleX = node.scaleX();
      const scaleY = node.scaleY();

      const width = Math.max(5, evt.target.width() * scaleX);
      const height = Math.max(5, evt.target.height() * scaleY);

      node.scaleX(1);
      node.scaleY(1);

      onChange({
        x: node.x(),
        y: node.y(),
        rotation: node.rotation(),
        width: Math.max(5, width * scaleX),
        height: Math.max(5, height * scaleY),
      });
    },
    [onChange]
  );

  React.useEffect(() => {
    if (isSelected && trRef.current) {
      // we need to attach transformer manually
      const node = annotationRectRef.current ?? annotationImageRef.current;
      if (node) {
        trRef.current.nodes([node]);
        trRef.current.getLayer()?.batchDraw();
      }
    }
  }, [isSelected]);

  const imgSrc = annotation.imgSrc ?? crossSvg;

  return (
    <React.Fragment>
      {annotation.isWireframe && !annotation.imgSrc ? (
        <Rect
          onClick={onSelect}
          onTap={onSelect}
          ref={annotationRectRef}
          x={annotation.x}
          y={annotation.y}
          width={annotation.width}
          height={annotation.height}
          rotation={annotation.rotation}
          stroke={annotation.outline.brush.color}
          fill={annotation.fill.color}
          opacity={annotation.fill.alpha}
          draggable={isSelected}
          strokeScaleEnabled={false}
          onDragEnd={onDragEnd}
          onTransform={onTransform}
          onTransformEnd={onTransformEnd}
        />
      ) : (
        <GalleryEditAnnotationRectangleImage
          ref={annotationImageRef}
          annotation={annotation}
          isSelected={isSelected}
          onSelect={onSelect}
          imgSrc={imgSrc}
          onDragEnd={onDragEnd}
          onTransform={onTransform}
          onTransformEnd={onTransformEnd}
        />
      )}

      {isSelected && (
        <Transformer
          ref={trRef}
          keepRatio={false}
          anchorSize={5}
          ignoreStroke={false}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};
