import { useAnnotationQuery } from "../../data/react-query/queries/use-annotation-query";
import { flattenToDictionary } from "../../utils/flatten";
import { GalleryToolboxPropertiesContainer } from "./gallery-toolbox-properties-container";

export type GalleryToolboxAnnotationOverlayPropertiesProps = {
  width: number;
  height: number;
  selectedAnnotationId: string;
  galleryItemId: string;
};

export const GalleryToolboxAnnotationOverlayProperties: React.FC<
  GalleryToolboxAnnotationOverlayPropertiesProps
> = ({ height, width, selectedAnnotationId, galleryItemId }) => {
  const annotation = useAnnotationQuery({
    annotationId: selectedAnnotationId,
    galleryItemId: galleryItemId,
  });
  if (!annotation.data) {
    return undefined;
  }
  const data = flattenToDictionary(annotation.data);
  return (
    <GalleryToolboxPropertiesContainer
      height={height}
      width={width}
      data={data}
      title="Annotation Propertiess"
    />
  );
};
