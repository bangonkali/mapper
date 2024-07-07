import { Annotation } from "../../entities/annotation/annotation-schema";
import { Rect, Transformer } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import React from "react";
import Konva from "konva";

export type AnnotationRectangleOnChanged = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
};

export type AnnotationRectangleProps = {
  annotation: Annotation;
  isSelected: boolean;
  onSelect: (evt: KonvaEventObject<MouseEvent>) => void;
  onChange: (evt: AnnotationRectangleOnChanged) => void;
};

export const AnnotationRectangle: React.FC<AnnotationRectangleProps> = ({
  annotation,
  isSelected,
  onSelect,
  onChange,
}) => {
  const shapeRef = React.useRef<Konva.Rect>(null);
  const trRef = React.useRef<Konva.Transformer>(null);

  React.useEffect(() => {
    if (isSelected && trRef.current) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current!]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
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
        onDragEnd={(e) => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
            rotation: e.target.rotation(),
            width: annotation.width,
            height: annotation.height,
          });
        }}
        onTransform={(e) => {
          // https://konvajs.org/docs/select_and_transform/Ignore_Stroke_On_Transform.html
          const node = shapeRef.current;
          if (!node) return;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          const width = Math.max(5, e.target.width() * scaleX);
          const height = Math.max(5, e.target.height() * scaleY);

          node.scaleX(1);
          node.scaleY(1);
          node.width(width);
          node.height(height);
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          if (!node) return;

          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          const width = Math.max(5, e.target.width() * scaleX);
          const height = Math.max(5, e.target.height() * scaleY);

          node.scaleX(1);
          node.scaleY(1);

          onChange({
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            width: Math.max(5, width * scaleX),
            height: Math.max(5, height * scaleY),
          });
        }}
      />
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
