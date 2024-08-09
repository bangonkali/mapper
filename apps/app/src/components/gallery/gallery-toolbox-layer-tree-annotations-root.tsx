import { useState } from 'react';
import { Canvas } from '../../entities/canvas/canvas-schema';
import { GalleryToolboxLayerTreeAnnotationNode } from './gallery-toolbox-layer-tree-annotation-node';
import { GalleryToolboxLayerTreeSimpleNode } from './gallery-toolbox-layer-tree-simple-node';
import { useStore } from '@tanstack/react-store';
import { currentAnnotationsStore } from '../../data/store/active-canvas-store';

export type GalleryToolboxLayerTreeAnnotationsRootProps = {
  width: number;
  canvas: Canvas;
  selectedAnnotationId: string | null;
};

export const GalleryToolboxLayerTreeAnnotationsRoot: React.FC<
  GalleryToolboxLayerTreeAnnotationsRootProps
> = ({ width, canvas, selectedAnnotationId }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const annotations = useStore(currentAnnotationsStore, (state) => {
    return state.filter((c) => c.canvasId === canvas.canvasId);
  });
  const currentLevel = 0;
  const childrenLevel = 1;
  const annotationFragments = isExpanded
    ? annotations
        .filter((x) => !x.parentAnnotationId)
        .map((annotation) => {
          return (
            <GalleryToolboxLayerTreeAnnotationNode
              level={childrenLevel}
              key={annotation.annotationId}
              width={width}
              selectedAnnotationId={selectedAnnotationId}
              annotation={annotation}
              annotations={annotations}
              recursive={true}
            />
          );
        })
    : [];

  return (
    <div>
      <GalleryToolboxLayerTreeSimpleNode
        width={width}
        level={currentLevel}
        title={'Annotations'}
        isVisible={true}
        isExpanded={isExpanded}
        onExpandToggleClick={() => setIsExpanded(!isExpanded)}
        onVisibleCheckboxClick={() => {
          console.log('clicked');
        }}
      />
      {isExpanded && annotationFragments}
    </div>
  );
};
