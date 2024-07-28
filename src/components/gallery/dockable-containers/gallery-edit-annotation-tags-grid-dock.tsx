import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../data/db/db';
import { Route } from '../../../routes/canvas.$canvasId.lazy';
import { GalleryEditDockProps } from '../gallery-edit-dock-props';
import { GalleryEditAnnotationTagsGrid } from '../gallery-edit-annotation-tags-grid';
import { gallerySelectedAnnotationStore } from '../../../data/store/canvases-store';
import { useStore } from '@tanstack/react-store';
import { currentAnnotationsStore } from '../../../data/store/active-canvas-store';

export const GalleryEditAnnotationTagsGridDock: React.FC<
  GalleryEditDockProps
> = ({ width, height }) => {
  const { canvasId } = Route.useParams();

  const annotations = useStore(currentAnnotationsStore, (state) => {
    return state.filter((c) => c.canvasId === canvasId);
  });
  const selectedAnnotationId = useStore(gallerySelectedAnnotationStore);

  const annotationTags =
    useLiveQuery(() =>
      db.annotationTags.where('canvasId').equals(canvasId).toArray()
    ) ?? [];

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
