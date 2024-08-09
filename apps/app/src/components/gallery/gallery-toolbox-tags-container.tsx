import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../data/db/db';
import { Canvas } from '../../entities/canvas/canvas-schema';
import { GalleryToolboxLayerTreeTagTypeNode } from './gallery-toolbox-layer-tree-tag-type-node';

export type GalleryToolboxTagsContainerProps = {
  width: number;
  focusedImage: Canvas;
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
    db.annotationTags.where('canvasId').equals(focusedImage.canvasId).toArray()
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
