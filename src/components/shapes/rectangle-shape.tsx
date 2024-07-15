export type RectangleShapeProps = {
  width: number;
  height: number;
  fill: string;
  stroke: string;
};

export const RectangleShape = ({
  width,
  height,
  fill,
  stroke,
}: RectangleShapeProps) => {
  return (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      <rect
        width={width}
        height={height}
        x="0"
        y="0"
        fill={fill}
        stroke={stroke}
        strokeWidth={3}
      />
      Sorry, your browser does not support inline SVG.
    </svg>
  );
};
