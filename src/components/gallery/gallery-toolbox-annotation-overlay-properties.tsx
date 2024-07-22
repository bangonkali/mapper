import { usePutAnnotation } from '../../data/react-query/mutations/use-put-annotation';
import { useAnnotationQuery } from '../../data/react-query/queries/use-annotation-query';
import { AnnotationSchema } from '../../entities/annotation/annotation-schema';
import { GalleryToolboxPropertiesGrid } from './gallery-toolbox-properties-grid';

export type GalleryToolboxAnnotationOverlayPropertiesProps = {
  width: number;
  height: number;
  selectedAnnotationId: string;
  galleryItemId: string;
};

export const GalleryToolboxAnnotationOverlayProperties: React.FC<
  GalleryToolboxAnnotationOverlayPropertiesProps
> = ({ height, width, selectedAnnotationId, galleryItemId }) => {
  const mutateAnnotation = usePutAnnotation();
  const annotation = useAnnotationQuery({
    annotationId: selectedAnnotationId,
    galleryItemId: galleryItemId,
  });

  if (!annotation.data) {
    return undefined;
  }

  return (
    <GalleryToolboxPropertiesGrid
      key={annotation.data.annotationId}
      height={height}
      width={width}
      obj={annotation.data}
      templates={[
        {
          key: 'annotationId',
          label: 'Annotation Id',
          description: 'The unique identifier for the annotation.',
          inputType: 'text',
          readonly: true,
        },
        {
          key: 'galleryItemId',
          label: 'Gallery Item Id',
          description: 'The unique identifier for the gallery item.',
          inputType: 'text',
          readonly: true,
        },
        {
          key: 'type',
          label: 'Type',
          description: 'The type of annotation.',
          inputType: 'text',
          readonly: true,
        },
      ]}
      schema={AnnotationSchema}
      title={`Annotation`}
      onChange={(e) => {
        mutateAnnotation.mutate({ data: e.value });
      }}
    />
  );
};
