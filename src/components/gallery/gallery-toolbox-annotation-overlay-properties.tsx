import { usePutAnnotation } from "../../data/react-query/mutations/use-put-annotation";
import { useAnnotationQuery } from "../../data/react-query/queries/use-annotation-query";
import { flattenToDictionary } from "../../utils/flatten";
import {
  GalleryToolboxPropertiesChanged,
  GalleryToolboxPropertiesContainer,
} from "./gallery-toolbox-properties-container";

export type GalleryToolboxAnnotationOverlayPropertiesProps = {
  width: number;
  height: number;
  selectedAnnotationId: string;
  galleryItemId: string;
};

export const GalleryToolboxAnnotationOverlayProperties: React.FC<
  GalleryToolboxAnnotationOverlayPropertiesProps
> = ({ height, width, selectedAnnotationId, galleryItemId }) => {
  const mutateAnnotation = usePutAnnotation();
  const annotation = useAnnotationQuery({
    annotationId: selectedAnnotationId,
    galleryItemId: galleryItemId,
  });
  if (!annotation.data) {
    return undefined;
  }
  const data = flattenToDictionary(annotation.data);
  const handleSaveAnnotation = (value: GalleryToolboxPropertiesChanged) => {
    console.log(value);
    mutateAnnotation.mutate({
      data: {
        ...annotation.data!,
        height: value.height > 0 ? value.height : annotation.data?.height!,
        width: value.width > 0 ? value.width : annotation.data?.width!,
        title: value.title > " " ? value.title : annotation.data?.title!,
        description:
          value.description > " "
            ? value.description
            : annotation.data?.description!,
        x: value.x > 0 ? value.x : annotation.data?.x!,
        y: value.y > 0 ? value.y : annotation.data?.y!,
        frame: value.frame > 0 ? value.frame : annotation.data?.frame!,
        rotation:
          value.rotation > 0 ? value.rotation : annotation.data?.rotation!,
      },
    });
  };
  return (
    <GalleryToolboxPropertiesContainer
      height={height}
      width={width}
      data={data}
      title="Annotation Propertiess"
      onChange={(e) => {
        handleSaveAnnotation(e);
      }}
    />
  );
};
