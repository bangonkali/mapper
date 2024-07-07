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
        onDragEnd={(e) => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
            rotation: e.target.rotation(),
            width: annotation.width,
            height: annotation.height,
          });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          if (!node) return;

          onChange({
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            width: Math.max(5, node.width()),
            height: Math.max(node.height()),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
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
