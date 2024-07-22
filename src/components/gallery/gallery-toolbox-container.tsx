import { useStore } from '@tanstack/react-store';
import { GalleryToolboxAnnotationOverlayProperties } from './gallery-toolbox-annotation-overlay-properties';
import { GalleryToolboxItemProperties } from './gallery-toolbox-item-properties';
import { gallerySelectedAnnotationStore } from '../../data/store/gallery-items-store';
import { useGalleryItemsQuery } from '../../data/react-query/queries/use-gallery-items-query';
import { GalleryToolboxLayerTreeContainer } from './gallery-toolbox-layer-tree-container';
import { colors } from '../../consts/colors';
import { Route } from '../../routes/gallery.item.$galleryItemId.lazy';

export type GalleryToolboxContainerProps = {
  width: number;
  height: number;
  side: 'left' | 'right';
};

export const GalleryToolboxContainer: React.FC<
  GalleryToolboxContainerProps
> = ({ height, width, side }) => {
  const { galleryItemId } = Route.useParams();
  const galleryItemsQuery = useGalleryItemsQuery();
  const selectedAnnotationId = useStore(gallerySelectedAnnotationStore);
  const focusedImageId = galleryItemId;
  const galleryItems = galleryItemsQuery.data ?? [];
  const focusedGalleryItem = galleryItems.find(
    (item) => item.galleryItemId === focusedImageId
  );

  // find the annotation tags for focusedGalleryItem
  const borderWidth = 1;

  return (
    <div
      className="gallery-toolbox-container"
      style={{
        height: height,
        width: width - borderWidth,
        display: 'flex',
        flexDirection: 'column',
        borderLeft: side === 'right' ? `1px solid ${colors.border}` : 'none',
        borderRight: side === 'left' ? `1px solid ${colors.border}` : 'none',
        overflowY: 'auto',
      }}
    >
      {side === 'left' ? (
        <>
          {focusedGalleryItem ? (
            <GalleryToolboxLayerTreeContainer
              width={width - borderWidth}
              height={height}
              focusedImage={focusedGalleryItem}
              selectedAnnotationId={selectedAnnotationId}
            />
          ) : null}
        </>
      ) : (
        <>
          {selectedAnnotationId && focusedImageId ? (
            <GalleryToolboxAnnotationOverlayProperties
              width={width - borderWidth}
              height={height}
              selectedAnnotationId={selectedAnnotationId}
              galleryItemId={focusedImageId}
            />
          ) : null}

          <GalleryToolboxItemProperties
            width={width - borderWidth}
            height={height}
            focusedImage={focusedGalleryItem}
          />
        </>
      )}
    </div>
  );
};
