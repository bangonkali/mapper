import { useState } from 'react';
import { GalleryToolboxLayerTreeAnnotationNode } from './gallery-toolbox-layer-tree-annotation-node';
import { GalleryToolboxLayerTreeSimpleNode } from './gallery-toolbox-layer-tree-simple-node';
import { Annotation } from '../../entities/annotation/annotation-schema';
import { gallerySelectedAnnotationStore } from '../../data/store/canvases-store';
import { usePutAnnotation } from '../../data/react-query/mutations/use-put-annotation';
import { produce } from 'immer';

export type GalleryToolboxLayerTreeAnnotationsTrunkProps = {
  width: number;
  selectedAnnotationId: string | null;
  annotations: Annotation[];
  annotation: Annotation;
  level: number;
};

export const GalleryToolboxLayerTreeAnnotationsTrunk: React.FC<
  GalleryToolboxLayerTreeAnnotationsTrunkProps
> = ({ width, selectedAnnotationId, annotations, annotation, level }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const putAnnotation = usePutAnnotation();
  const annotationFragments = isExpanded
    ? annotations
        .filter((x) => x.parentAnnotationId === annotation.annotationId)
        .map((annotation) => {
          return (
            <GalleryToolboxLayerTreeAnnotationNode
              level={level + 1}
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
        level={level}
        title={annotation.title}
        isVisible={annotation.visible}
        isExpanded={isExpanded}
        onExpandToggleClick={() => setIsExpanded(!isExpanded)}
        isSelected={selectedAnnotationId === annotation.annotationId}
        onVisibleCheckboxClick={() => {
          // run a mutation to change the state of the annotation to visible
          putAnnotation.mutate({
            data: produce(annotation, (draft) => {
              draft.visible = !draft.visible;
            }),
          });
        }}
        onNodeClick={() => {
          gallerySelectedAnnotationStore.setState(() => {
            return annotation.annotationId;
          });
        }}
      />
      {isExpanded && annotationFragments}
    </div>
  );
};
