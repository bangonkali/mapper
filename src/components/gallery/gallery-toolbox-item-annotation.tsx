import { Annotation } from "../../entities/annotation/annotation-schema";
import { GalleryToolboxAnnotationContainer } from "./gallery-toolbox-annotation-container";

export type GalleryToolboxItemAnnotationProps = {
  width: number;
  height: number;
  focusedImage: Annotation[] | undefined;
};

export const GalleryToolboxItemAnnotation: React.FC<
  GalleryToolboxItemAnnotationProps
> = ({ height, width, focusedImage }) => {
  if (!focusedImage) {
    return undefined;
  }
  //   const data = flattenToDictionary(focusedImage, ["annotations"]);
  return (
    <GalleryToolboxAnnotationContainer
      height={height}
      width={width}
      data={focusedImage}
    />
  );
};
