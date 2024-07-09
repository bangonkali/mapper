import { GalleryItem } from "../../entities/gallery-item/gallery-item-schema";
import { flattenToDictionary } from "../../utils/flatten";
import { GalleryToolboxPropertiesContainer } from "./gallery-toolbox-properties-container";

export type GalleryToolboxItemPropertiesProps = {
  width: number;
  height: number;
  focusedImage: GalleryItem | undefined;
};

export const GalleryToolboxItemProperties: React.FC<
  GalleryToolboxItemPropertiesProps
> = ({ height, width, focusedImage }) => {
  if (!focusedImage) {
    return undefined;
  }
  const data = flattenToDictionary(focusedImage, ["annotations"]);
  return (
    <GalleryToolboxPropertiesContainer
      height={height}
      width={width}
      data={data}
      title="Properties"
      onChange={() => {
        return;
      }}
    />
  );
};
