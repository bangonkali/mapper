import { GalleryToolboxLayerTreeAnnotationNode } from './gallery-toolbox-layer-tree-annotation-node';
import { GalleryToolboxLayerTreeSimpleNode } from './gallery-toolbox-layer-tree-simple-node';
import { Canvas } from '../../entities/canvas/canvas-schema';
import { AnnotationTag } from '../../entities/annotation/annotation-tag-schema';
import { useState } from 'react';
import { useStore } from '@tanstack/react-store';
import { currentAnnotationsStore } from '../../data/store/active-canvas-store';

export type GalleryToolboxLayerTreeSimpleTrunkProps = {
  width: number;
  canvas: Canvas;
  selectedAnnotationId: string | null;
  tagValues: AnnotationTag[];
  tagValue: string;
  level: number;
};

export const GalleryToolboxLayerTreeSimpleTrunk: React.FC<
  GalleryToolboxLayerTreeSimpleTrunkProps
> = ({ width, selectedAnnotationId, canvas, tagValues, tagValue, level }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const annotations = useStore(currentAnnotationsStore, (state) => {
    return state.filter((c) => c.canvasId === canvas.canvasId);
  });

  let annotationNodes: (JSX.Element | undefined)[] = [];
  if (isExpanded) {
    const annotationIdsWithTagValue = tagValues
      .filter((tag) => tag.value === tagValue)
      .map((tag) => tag.annotationId);

    annotationNodes = annotationIdsWithTagValue
      .map((annotationId) => {
        const annotation = annotations.find(
          (annotation) => annotation.annotationId === annotationId
        );
        if (!annotation) return undefined;
        return (
          <GalleryToolboxLayerTreeAnnotationNode
            level={level + 3}
            key={annotationId}
            width={width}
            selectedAnnotationId={selectedAnnotationId}
            annotation={annotation}
            recursive={false}
            annotations={[]}
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
