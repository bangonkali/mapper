import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../data/db/db";
import { useAnnotationsQuery } from "../../../data/react-query/queries/use-annotations-query";
import { Route } from "../../../routes/gallery.item.$galleryItemId.lazy";
import { GalleryEditDockProps } from "../gallery-edit-dock-props";
import { GalleryEditAnnotationTagsGrid } from "../gallery-edit-annotation-tags-grid";
import { gallerySelectedAnnotationStore } from "../../../data/store/gallery-items-store";
import { useStore } from "@tanstack/react-store";

export const GalleryEditAnnotationTagsGridDock: React.FC<
  GalleryEditDockProps
> = ({ width, height }) => {
  const { galleryItemId } = Route.useParams();
  const focusedImageId = galleryItemId;

  const annotationsQuery = useAnnotationsQuery({
    galleryItemId: focusedImageId,
  });
  const selectedAnnotationId = useStore(gallerySelectedAnnotationStore);

  const annotationTags =
    useLiveQuery(() =>
      db.annotationTags.where("galleryItemId").equals(galleryItemId).toArray()
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
