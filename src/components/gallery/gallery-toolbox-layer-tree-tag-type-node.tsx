import { AnnotationTag } from '../../entities/annotation/annotation-tag-schema';
import { GalleryItem } from '../../entities/gallery-item/gallery-item-schema';
import { GalleryToolboxLayerTreeSimpleNode } from './gallery-toolbox-layer-tree-simple-node';
import { GalleryToolboxLayerTreeSimpleTrunk } from './gallery-toolbox-layer-tree-simple-trunk';
import { useState } from 'react';

export type GalleryToolboxLayerTreeTagTypeNodeProps = {
  width: number;
  focusedImage: GalleryItem;
  selectedAnnotationId: string | null;
  tagValues: AnnotationTag[];
  tagType: string;
  level: number;
};

export const GalleryToolboxLayerTreeTagTypeNode: React.FC<
  GalleryToolboxLayerTreeTagTypeNodeProps
> = ({
  width,
  focusedImage,
  selectedAnnotationId,
  tagValues,
  tagType,
  level,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const uniqueTagValues = Array.from(
    new Set(tagValues.map((tagValue) => tagValue.value))
  );
  const tagValueRows = uniqueTagValues?.map((tagValue) => {
    return (
      <GalleryToolboxLayerTreeSimpleTrunk
        key={`${tagType}-${tagValue}`}
        level={level}
        width={width}
        focusedImage={focusedImage}
        selectedAnnotationId={selectedAnnotationId}
        tagValues={tagValues}
        tagValue={tagValue}
      />
    );
  });

  return (
    <>
      <GalleryToolboxLayerTreeSimpleNode
        width={width}
        level={level}
        title={tagType}
        isVisible={true}
        isExpanded={isExpanded}
        onExpandToggleClick={() => setIsExpanded((prev) => !prev)}
      />
      {isExpanded ? tagValueRows : null}
    </>
  );
};
