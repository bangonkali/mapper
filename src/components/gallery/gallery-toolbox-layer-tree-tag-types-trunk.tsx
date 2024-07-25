import { useState } from 'react';
import { Canvas } from '../../entities/canvas/canvas-schema';
import { GalleryToolboxLayerTreeSimpleNode } from './gallery-toolbox-layer-tree-simple-node';
import { GalleryToolboxTagsContainer } from './gallery-toolbox-tags-container';

export type GalleryToolboxLayerTreeTagTypesTrunkProps = {
  width: number;
  height: number;
  focusedImage: Canvas;
  selectedAnnotationId: string | null;
};

export const GalleryToolboxLayerTreeTagTypesTrunk: React.FC<
  GalleryToolboxLayerTreeTagTypesTrunkProps
> = ({ width, focusedImage, selectedAnnotationId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <GalleryToolboxLayerTreeSimpleNode
        width={width}
        level={0}
        title={'Tag Types'}
        isVisible={true}
        isExpanded={isExpanded}
        onExpandToggleClick={() => setIsExpanded(!isExpanded)}
      />
      {isExpanded && (
        <GalleryToolboxTagsContainer
          level={0}
          width={width}
          focusedImage={focusedImage}
          selectedAnnotationId={selectedAnnotationId}
        />
      )}
    </div>
  );
};
