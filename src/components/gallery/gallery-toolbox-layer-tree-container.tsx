import { colors } from "../../consts/colors";
import { usePutAnnotation } from "../../data/react-query/mutations/use-put-annotation";
import { useAnnotationsQuery } from "../../data/react-query/queries/use-annotations-query";
import { gallerySelectedAnnotationStore } from "../../data/store/gallery-items-store";
import { GalleryItem } from "../../entities/gallery-item/gallery-item-schema";
import { RectangleShape } from "../shapes/rectangle-shape";

export type GalleryToolboxLayerTreeContainerProps = {
  width: number;
  height: number;
  focusedImage: GalleryItem;
  selectedAnnotationId: string | null;
};

export const GalleryToolboxLayerTreeContainer: React.FC<
  GalleryToolboxLayerTreeContainerProps
> = ({ height, width, focusedImage, selectedAnnotationId }) => {
  const rowHeight = 18;
  const mutateAnnotation = usePutAnnotation();
  const annotationQuery = useAnnotationsQuery({
    galleryItemId: focusedImage.galleryItemId,
  });

  const annotations = annotationQuery.data?.map((annotation) => {
    const selected = annotation.annotationId === selectedAnnotationId;
    const iconWidth = rowHeight - 4;
    const checkboxWidth = 20;
    const descriptionWidth = width - iconWidth;

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
            paddingLeft: "2px",
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

        {/* <div
          style={{
            display: "block",
            paddingLeft: "2px",
            paddingTop: "2px",
            width: descriptionWidth,
            maxWidth: descriptionWidth,
          }}
        >
          {annotation.title} - {annotation.annotationId}
        </div> */}
      </div>
    );
  });

  return (
    <div className="ns" style={{ height: height, width: width }}>
      <div
        style={{
          width: width,
          height: "20px",
          backgroundColor: "orange",
          display: "flex",
          alignItems: "center",
        }}
      >
        Layers
      </div>
      <div
        style={{
          width: width,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {annotations}
      </div>
    </div>
  );
};
