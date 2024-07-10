import { colors } from "../../consts/colors";
import { usePutAnnotation } from "../../data/react-query/mutations/use-put-annotation";
import { gallerySelectedAnnotationStore } from "../../data/store/gallery-items-store";
import { Annotation } from "../../entities/annotation/annotation-schema";
import { RectangleShape } from "../shapes/rectangle-shape";

export type GalleryToolboxLayerTreeAnnotationNodeProps = {
  width: number;
  selectedAnnotationId: string | null;
  annotation: Annotation;
  level: number;
};

export const GalleryToolboxLayerTreeAnnotationNode: React.FC<
  GalleryToolboxLayerTreeAnnotationNodeProps
> = ({ width, selectedAnnotationId, annotation, level }) => {
  const scrollbarRight = 12;
  const rowHeight = 18;
  const mutateAnnotation = usePutAnnotation();
  const selected = annotation.annotationId === selectedAnnotationId;
  const iconWidth = rowHeight - 4;
  const checkboxWidth = 20;
  const levelPadding = 10 * level;
  const descriptionWidth = width - iconWidth - levelPadding - scrollbarRight;

  return (
    <div
      key={annotation.annotationId}
      style={{
        display: "flex",
        alignItems: "center",
        width: width,
        height: rowHeight,
        borderBottom: `1px solid ${colors.borders}`,
        backgroundColor: selected ? colors.selected : colors.background,
      }}
    >
      <div
        style={{
          paddingLeft: 2 + levelPadding,
          paddingTop: "3px",
          paddingRight: "2px",
          width: iconWidth,
        }}
      >
        <RectangleShape
          width={iconWidth}
          height={iconWidth}
          fill={annotation.fill.color}
          stroke={annotation.outline.brush.color}
        />
      </div>

      <div
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          width: descriptionWidth - checkboxWidth,
        }}
        onClick={() => {
          gallerySelectedAnnotationStore.setState(
            () => annotation.annotationId
          );
        }}
      >
        {annotation.title} - {annotation.annotationId}
      </div>

      <div style={{ width: checkboxWidth }}>
        {/* check box for visibility */}
        <input
          type="checkbox"
          checked={annotation.visible}
          readOnly
          onClick={() => {
            // use mutation to update annotation visibility
            mutateAnnotation.mutate({
              data: {
                ...annotation,
                visible: !annotation.visible,
              },
            });
          }}
        />
      </div>
    </div>
  );
};
