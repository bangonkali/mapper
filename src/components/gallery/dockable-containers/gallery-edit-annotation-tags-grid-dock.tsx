import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../data/db/db';
import { useAnnotationsQuery } from '../../../data/react-query/queries/use-annotations-query';
import { Route } from '../../../routes/canvas.$canvasId.lazy';
import { GalleryEditDockProps } from '../gallery-edit-dock-props';
import { GalleryEditAnnotationTagsGrid } from '../gallery-edit-annotation-tags-grid';
import { gallerySelectedAnnotationStore } from '../../../data/store/canvases-store';
import { useStore } from '@tanstack/react-store';

export const GalleryEditAnnotationTagsGridDock: React.FC<
  GalleryEditDockProps
> = ({ width, height }) => {
  const { canvasId } = Route.useParams();
  const focusedImageId = canvasId;

  const annotationsQuery = useAnnotationsQuery({
    canvasId: focusedImageId,
  });
  const selectedAnnotationId = useStore(gallerySelectedAnnotationStore);

  const annotationTags =
    useLiveQuery(() =>
      db.annotationTags.where('canvasId').equals(canvasId).toArray()
    ) ?? [];

  const annotations = annotationsQuery.data ?? [];

  return (
    <GalleryEditAnnotationTagsGrid
      annotations={annotations}
      tags={annotationTags}
      height={height}
      width={width}
      selectedAnnotationId={selectedAnnotationId}
    />
  );
};
