import { useGalleryItemsQuery } from '../../../data/react-query/queries/use-gallery-items-query';
import { GalleryItem } from '../../../entities/gallery-item/gallery-item-schema';
import { Route } from '../../../routes/gallery.item.$galleryItemId.lazy';
import { GalleryEditCarousel } from '../gallery-edit-carousel';
import { GalleryEditDockProps } from '../gallery-edit-dock-props';

export const GalleryEditCarouselDock: React.FC<GalleryEditDockProps> = ({
  width,
  height,
}) => {
  const { galleryItemId } = Route.useParams();
  const focusedImageId = galleryItemId;
  const galleryItemsQuery = useGalleryItemsQuery();
  const items: GalleryItem[] = galleryItemsQuery.data ?? [];
  const focusedImage = items.find(
    (item) => item.galleryItemId === focusedImageId
  );

  if (!focusedImage) return;
  return (
    <GalleryEditCarousel
      items={items}
      height={height}
      focusedItem={focusedImage}
      width={width}
    />
  );
};
