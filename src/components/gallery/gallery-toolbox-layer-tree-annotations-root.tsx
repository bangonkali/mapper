import { useState } from 'react';
import { useAnnotationsQuery } from '../../data/react-query/queries/use-annotations-query';
import { Canvas } from '../../entities/canvas/canvas-schema';
import { GalleryToolboxLayerTreeAnnotationNode } from './gallery-toolbox-layer-tree-annotation-node';
import { GalleryToolboxLayerTreeSimpleNode } from './gallery-toolbox-layer-tree-simple-node';

export type GalleryToolboxLayerTreeAnnotationsRootProps = {
  width: number;
  focusedImage: Canvas;
  selectedAnnotationId: string | null;
};

export const GalleryToolboxLayerTreeAnnotationsRoot: React.FC<
  GalleryToolboxLayerTreeAnnotationsRootProps
> = ({ width, focusedImage, selectedAnnotationId }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const annotationQuery = useAnnotationsQuery({
    canvasId: focusedImage.canvasId,
  });
  const currentLevel = 0;
  const childrenLevel = 1;
  const annotations = annotationQuery.data || [];
  const annotationFragments = isExpanded
    ? annotationQuery.data
        ?.filter((x) => !x.parentAnnotationId)
        .sort((a, b) => {
          // check if a has children
          const aCountChildren = annotations.filter(
            (x) => x.parentAnnotationId === a.annotationId
          ).length;

          // check if b has children
          const bCountChildren = annotations.filter(
            (x) => x.parentAnnotationId === b.annotationId
          ).length;

          return bCountChildren - aCountChildren;
        })
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
