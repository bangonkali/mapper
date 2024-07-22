import { produce } from 'immer';
import { colors } from '../../consts/colors';
import { gallerySelectedAnnotationStore } from '../../data/store/gallery-items-store';
import { Annotation } from '../../entities/annotation/annotation-schema';
import { AnnotationTag } from '../../entities/annotation/annotation-tag-schema';
import { flattenToDictionary } from '../../utils/flatten';
import styles from './gallery-edit-annotation-tags-grid.module.css';
import { usePutAnnotation } from '../../data/react-query/mutations/use-put-annotation';

export type GalleryEditAnnotationTagsGridProps = {
  annotations: Annotation[];
  tags: AnnotationTag[];
  height: number;
  width: number;
  selectedAnnotationId: string | null;
};

export const GalleryEditAnnotationTagsGrid: React.FC<
  GalleryEditAnnotationTagsGridProps
> = ({ annotations, tags, height, width, selectedAnnotationId }) => {
  const putAnnotation = usePutAnnotation();

  const topBorder = 1;
  const allVisible = annotations.every((annotation) => annotation.visible);
  const allNotVisible = annotations.every((annotation) => !annotation.visible);
  const uniqueTagTypes = Array.from(new Set(tags.map((tag) => tag.type)));

  const uniqueAnnotationProps = new Set<string>();
  const rows = annotations.map((annotation) => {
    const annotationProps = flattenToDictionary(annotation);

    return (
      <tr
        key={annotation.annotationId}
        style={{
          backgroundColor:
            selectedAnnotationId === annotation.annotationId
              ? colors.selected
              : 'transparent',
        }}
        onClick={() => {
          // set selected annotation
          gallerySelectedAnnotationStore.setState(() =>
            selectedAnnotationId === annotation.annotationId
              ? null
              : annotation.annotationId
          );
        }}
      >
        {/* Show the Annotation Title */}
        <td
          className={styles.slim}
          key={`row-${annotation.annotationId}-visible`}
          onClick={(e) => {
            e.stopPropagation();
            putAnnotation.mutate({
              data: produce(annotation, (draft) => {
                draft.visible = !draft.visible;
              }),
            });
          }}
        >
          <input type="checkbox" checked={annotation.visible} readOnly />
        </td>

        {/* Show the Annotation Title */}
        <td key={`row-${annotation.annotationId}`}>{annotation.title}</td>

        {/* Show the tag types */}
        {uniqueTagTypes.map((tagType) => {
          const tagValues = tags.find(
            (tag) =>
              tag.type === tagType &&
              tag.annotationId === annotation.annotationId
          );
          if (!tagValues) return <td key={tagType}></td>;
          return <td key={tagType}>{tagValues.value}</td>;
        })}

        {/* Show the properties of the annotation */}
        {annotationProps.map((prop) => {
          uniqueAnnotationProps.add(prop.key);
          return <td key={prop.key}>{prop.value?.toString() ?? ''}</td>;
        })}
      </tr>
    );
  });

  return (
    <div
      style={{
        height: height,
        width: width,
        minHeight: height,
        minWidth: width,
        maxHeight: height,
        maxWidth: width,
        borderTop: `${topBorder}px solid ${colors.border}`,
        overflowY: 'auto',
      }}
    >
      <table
        className={styles.table}
        style={{
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr>
            {/* Show the Annotation Title */}
            <th
              className={styles.slim}
              onClick={(e) => {
                e.stopPropagation();
                if (allVisible) {
                  annotations.forEach((annotation) => {
                    putAnnotation.mutate({
                      data: produce(annotation, (draft) => {
                        draft.visible = false;
                      }),
                    });
                  });
                } else {
                  annotations.forEach((annotation) => {
                    putAnnotation.mutate({
                      data: produce(annotation, (draft) => {
                        draft.visible = true;
                      }),
                    });
                  });
                }
              }}
            >
              <input
                type="checkbox"
                readOnly
                checked={allVisible && !allNotVisible}
              />
            </th>

            <th>Annotation</th>

            {/* Show the tag types */}
            {uniqueTagTypes.map((tagType) => (
              <th key={tagType}>{tagType}</th>
            ))}

            {/* Show the properties of the annotation */}
            {Array.from(uniqueAnnotationProps).map((prop) => (
              <th key={prop}>{prop}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};
