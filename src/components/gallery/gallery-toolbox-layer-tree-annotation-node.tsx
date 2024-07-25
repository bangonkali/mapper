import { colors } from '../../consts/colors';
import { usePutAnnotation } from '../../data/react-query/mutations/use-put-annotation';
import { gallerySelectedAnnotationStore } from '../../data/store/canvases-store';
import { Annotation } from '../../entities/annotation/annotation-schema';
import { RectangleShape } from '../shapes/rectangle-shape';
import { GalleryToolboxLayerTreeAnnotationsTrunk } from './gallery-toolbox-layer-tree-annotations-trunk';

export type GalleryToolboxLayerTreeAnnotationNodeProps = {
  width: number;
  selectedAnnotationId: string | null;
  annotations: Annotation[];
  annotation: Annotation;
  level: number;
  recursive: boolean;
};

export const GalleryToolboxLayerTreeAnnotationNode: React.FC<
  GalleryToolboxLayerTreeAnnotationNodeProps
> = ({
  width,
  selectedAnnotationId,
  annotations,
  annotation,
  level,
  recursive,
}) => {
  const scrollbarRight = 12;
  const rowHeight = 18;
  const mutateAnnotation = usePutAnnotation();
  const selected = annotation.annotationId === selectedAnnotationId;
  const iconWidth = rowHeight - 3;
  const checkboxWidth = rowHeight - 3;
  const levelPadding = level * 10;
  const descriptionWidth = width - iconWidth - levelPadding - scrollbarRight;

  if (recursive) {
    const isParent = annotations.some(
      (x) => x.parentAnnotationId === annotation.annotationId
    );

    if (isParent) {
      return (
        <GalleryToolboxLayerTreeAnnotationsTrunk
          width={width}
          selectedAnnotationId={selectedAnnotationId}
          annotations={annotations}
          annotation={annotation}
          level={level}
        />
      );
    }
  }

  return (
    <div
      key={annotation.annotationId}
      style={{
        display: 'flex',
        alignItems: 'center',
        width: width,
        height: rowHeight,
        backgroundColor: selected ? colors.selected : 'transparent',
      }}
    >
      <div
        style={{
          paddingLeft: levelPadding,
          paddingTop: 3,
          paddingRight: 2,
          width: iconWidth,
        }}
      >
        <RectangleShape
          width={iconWidth}
          height={iconWidth}
          fill={annotation.fill.color}
          stroke={annotation.outline.brush.color}
        />
      </div>

      <div
        style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          width: descriptionWidth - checkboxWidth,
        }}
        onClick={() => {
          gallerySelectedAnnotationStore.setState(
            () => annotation.annotationId
          );
        }}
      >
        {annotation.title}
      </div>

      <input
        type="checkbox"
        checked={annotation.visible}
        readOnly
        onClick={() => {
          mutateAnnotation.mutate({
            data: {
              ...annotation,
              visible: !annotation.visible,
            },
          });
        }}
      />
    </div>
  );
};
