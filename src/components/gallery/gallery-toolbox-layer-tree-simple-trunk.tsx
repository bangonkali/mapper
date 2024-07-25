import { useAnnotationsQuery } from '../../data/react-query/queries/use-annotations-query';
import { Canvas } from '../../entities/canvas/canvas-schema';
import { GalleryToolboxLayerTreeAnnotationNode } from './gallery-toolbox-layer-tree-annotation-node';
import { GalleryToolboxLayerTreeSimpleNode } from './gallery-toolbox-layer-tree-simple-node';
import { AnnotationTag } from '../../entities/annotation/annotation-tag-schema';
import { useState } from 'react';

export type GalleryToolboxLayerTreeSimpleTrunkProps = {
  width: number;
  focusedImage: Canvas;
  selectedAnnotationId: string | null;
  tagValues: AnnotationTag[];
  tagValue: string;
  level: number;
};

export const GalleryToolboxLayerTreeSimpleTrunk: React.FC<
  GalleryToolboxLayerTreeSimpleTrunkProps
> = ({
  width,
  focusedImage,
  selectedAnnotationId,
  tagValues,
  tagValue,
  level,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const annotationQuery = useAnnotationsQuery({
    canvasId: focusedImage.canvasId,
  });

  let annotationNodes: (JSX.Element | undefined)[] = [];
  if (isExpanded) {
    const annotationIdsWithTagValue = tagValues
      .filter((tag) => tag.value === tagValue)
      .map((tag) => tag.annotationId);

    annotationNodes = annotationIdsWithTagValue
      .map((annotationId) => {
        const annotation = annotationQuery.data?.find(
          (annotation) => annotation.annotationId === annotationId
        );
        if (!annotation) return undefined;
        return (
          <GalleryToolboxLayerTreeAnnotationNode
            level={level + 5}
            key={annotationId}
            width={width}
            selectedAnnotationId={selectedAnnotationId}
            annotation={annotation}
          />
        );
      })
      .filter((node) => node !== undefined);
  }

  return (
    <div>
      <GalleryToolboxLayerTreeSimpleNode
        width={width}
        level={level + 1}
        title={tagValue}
        isVisible={true}
        isExpanded={isExpanded}
        onExpandToggleClick={() => setIsExpanded(!isExpanded)}
      />
      {isExpanded && annotationNodes}
    </div>
  );
};
