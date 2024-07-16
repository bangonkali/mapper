import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../data/db/db";
import { GalleryItem } from "../../entities/gallery-item/gallery-item-schema";
import { GalleryToolboxLayerTreeTagTypeNode } from "./gallery-toolbox-layer-tree-tag-type-node";

export type GalleryToolboxTagsContainerProps = {
  width: number;
  focusedImage: GalleryItem;
  selectedAnnotationId: string | null;
  level: number;
};

export const GalleryToolboxTagsContainer: React.FC<
  GalleryToolboxTagsContainerProps
> = ({ width, focusedImage, selectedAnnotationId, level }) => {
  // TODO: Convert to a useQuery hook! use of useLiveQuery is not recommended for
  // final implementation. This is a temporary solution to get the code working for
  // demo purposes! - gil
  const annotationTags = useLiveQuery(() =>
    db.annotationTags
      .where("galleryItemId")
      .equals(focusedImage.galleryItemId)
      .toArray()
  );

  // group annotationTags array items by tag type
  const tagTypes = Array.from(new Set(annotationTags?.map((tag) => tag.type)));
  const tagTypeDockWindow = tagTypes.map((tagType) => {
    const tagValues = annotationTags?.filter((tag) => tag.type === tagType);
    if (!tagValues) return null;
    return (
      <GalleryToolboxLayerTreeTagTypeNode
        key={tagType}
        width={width}
        focusedImage={focusedImage}
        selectedAnnotationId={selectedAnnotationId}
        tagValues={tagValues}
        tagType={tagType}
        level={level + 1}
      />
    );
  });

  return <div>{tagTypeDockWindow}</div>;
};
