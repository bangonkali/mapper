import { useState } from 'react';
import { useAnnotationsQuery } from '../../data/react-query/queries/use-annotations-query';
import { GalleryItem } from '../../entities/gallery-item/gallery-item-schema';
import { GalleryToolboxLayerTreeAnnotationNode } from './gallery-toolbox-layer-tree-annotation-node';
import { GalleryToolboxLayerTreeSimpleNode } from './gallery-toolbox-layer-tree-simple-node';

export type GalleryToolboxLayerTreeAnnotationsTrunkProps = {
  width: number;
  height: number;
  focusedImage: GalleryItem;
  selectedAnnotationId: string | null;
};

export const GalleryToolboxLayerTreeAnnotationsTrunk: React.FC<
  GalleryToolboxLayerTreeAnnotationsTrunkProps
> = ({ width, focusedImage, selectedAnnotationId }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const annotationQuery = useAnnotationsQuery({
    galleryItemId: focusedImage.galleryItemId,
  });

  const annotations = isExpanded
    ? annotationQuery.data?.map((annotation) => {
        return (
          <GalleryToolboxLayerTreeAnnotationNode
            level={2}
            key={annotation.annotationId}
            width={width}
            selectedAnnotationId={selectedAnnotationId}
            annotation={annotation}
          />
        );
      })
    : [];

  return (
    <div>
      <GalleryToolboxLayerTreeSimpleNode
        width={width}
        level={0}
        title={'Annotations'}
        isVisible={true}
        isExpanded={isExpanded}
        onExpandToggleClick={() => setIsExpanded(!isExpanded)}
      />
      {isExpanded && annotations}
    </div>
  );
};
