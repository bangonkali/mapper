import { set } from "radash";
import { usePutAnnotation } from "../../data/react-query/mutations/use-put-annotation";
import { useAnnotationQuery } from "../../data/react-query/queries/use-annotation-query";
import { AnnotationSchema } from "../../entities/annotation/annotation-schema";
import { flattenToDictionary } from "../../utils/flatten";
import { getPropertyPaths } from "../../utils/zod/zod-paths";
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

  const paths = getPropertyPaths(AnnotationSchema);
  const data = flattenToDictionary(annotation.data);
  const handleSaveAnnotation = (value: GalleryToolboxPropertiesChanged) => {
    if (annotation.data) {
      const annotationData = annotation.data;
      const type = paths.find((path) => path.path === value.new.key);
      if (type?.type === "ZodNumber") {
        const newValue = Number(value.new.value);
        set(annotationData, value.new.key, newValue);
      } else if (type?.type === "ZodBoolean") {
        const newValue = value.new.value === "true";
        set(annotationData, value.new.key, newValue);
      } else if (type?.type === "ZodString") {
        const newValue = value.new.value;
        set(annotationData, value.new.key, newValue);
      }
      const parseResult = AnnotationSchema.safeParse(annotation.data);
      if (parseResult.success) {
        mutateAnnotation.mutate({
          data: annotation.data,
        });
      }
    }
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
