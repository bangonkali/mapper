import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../data/db/db";
import { useAnnotationsQuery } from "../../data/react-query/queries/use-annotations-query";
import { GalleryItem } from "../../entities/gallery-item/gallery-item-schema";
import { GalleryToolboxLayerTreeAnnotationNode } from "./gallery-toolbox-layer-tree-annotation-node";
import { GalleryToolboxLayerTreeSimpleNode } from "./gallery-toolbox-layer-tree-simple-node";
import { GalleryToolboxPropertiesHeader } from "./gallery-toolbox-properties-header";

export type GalleryToolboxTagsContainerProps = {
  width: number;
  focusedImage: GalleryItem;
  selectedAnnotationId: string | null;
};

export const GalleryToolboxTagsContainer: React.FC<
  GalleryToolboxTagsContainerProps
> = ({ width, focusedImage, selectedAnnotationId }) => {
  // TODO: Convert to a useQuery hook! use of useLiveQuery is not recommended for
  // final implementation. This is a temporary solution to get the code working for
  // demo purposes! - gil
  const annotationTags = useLiveQuery(() =>
    db.annotationTags
      .where("galleryItemId")
      .equals(focusedImage.galleryItemId)
      .toArray()
  );
  const annotationQuery = useAnnotationsQuery({
    galleryItemId: focusedImage.galleryItemId,
  });

  // group annotationTags array items by tag type
  const tagTypes = Array.from(new Set(annotationTags?.map((tag) => tag.type)));
  // console.log(tagTypes);

  const tagTypeDockWindow = tagTypes.map((tagType) => {
    const tagValues = annotationTags?.filter((tag) => tag.type === tagType);
    if (!tagValues) return null;
    const uniqueTagValues = Array.from(
      new Set(tagValues.map((tagValue) => tagValue.value))
    );
    const tagValueRows = uniqueTagValues?.map((tagValue) => {
      const annotationIdsWithTagValue = tagValues
        .filter((tag) => tag.value === tagValue)
        .map((tag) => tag.annotationId);

      const annotationNodes = annotationIdsWithTagValue.map((annotationId) => {
        const annotation = annotationQuery.data?.find(
          (annotation) => annotation.annotationId === annotationId
        );
        if (!annotation) return null;
        return (
          <GalleryToolboxLayerTreeAnnotationNode
            level={3}
            key={annotationId}
            width={width}
            selectedAnnotationId={selectedAnnotationId}
            annotation={annotation}
          />
        );
      });

      return (
        <div key={tagValue}>
          <GalleryToolboxLayerTreeSimpleNode
            width={width}
            level={1}
            title={tagValue}
            isVisible={true}
          />

          {annotationNodes}
        </div>
      );
    });

    return (
      <div
        key={tagType}
        style={{
          width: width,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <GalleryToolboxPropertiesHeader
          width={width}
          title={tagType}
          isMinimized={false}
        />
        {tagValueRows}
      </div>
    );
  });

  return <div>{tagTypeDockWindow}</div>;
};
