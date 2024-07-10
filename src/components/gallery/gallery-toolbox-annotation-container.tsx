import { useStore } from "@tanstack/react-store";
import { colors } from "../../consts/colors";
import { gallerySelectedAnnotationStore } from "../../data/store/gallery-items-store";
import { Annotation } from "../../entities/annotation/annotation-schema";
import "./gallery.module.css";
export type GalleryToolboxAnnotationContainerProps = {
  width: number;
  height: number;
  data: Annotation[];
};

export const GalleryToolboxAnnotationContainer: React.FC<
  GalleryToolboxAnnotationContainerProps
> = ({ width, data }) => {
  const gallerySelectedAnnotation = useStore(gallerySelectedAnnotationStore);
  const rowHeight = 18;

  const rows = data.map((item, index) => {
    const isSelected = item.annotationId === gallerySelectedAnnotation;
    return (
      <div
        key={`${item.annotationId}`}
        style={{
          width: width,
          display: "flex",
          borderBottom: `1px solid ${colors.borders}`,
          backgroundColor: `${isSelected ? "#1e8cf3" : ""}`,
          color: `${isSelected ? "white" : ""}`,
        }}
      >
        <div
          style={{
            width: width,
            height: rowHeight,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            paddingLeft: "12px",
            gap: "16px",
          }}
          onClick={() => {
            gallerySelectedAnnotationStore.setState(() => item.annotationId);
          }}
        >
          {item.type + " - " + index}
        </div>
      </div>
    );
  });

  return (
    <div
      className="ns"
      style={{
        width: width,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: width,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {rows}
      </div>
    </div>
  );
};
