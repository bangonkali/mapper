import { useCanvasesQuery } from '../../../data/react-query/queries/use-canvases-query';
import { Canvas } from '../../../entities/canvas/canvas-schema';
import { Route } from '../../../routes/canvas.$canvasId.lazy';
import { GalleryEditCarousel } from '../gallery-edit-carousel';
import { GalleryEditDockProps } from '../gallery-edit-dock-props';

export const GalleryEditCarouselDock: React.FC<GalleryEditDockProps> = ({
  width,
  height,
}) => {
  const { canvasId } = Route.useParams();
  const focusedImageId = canvasId;
  const canvasesQuery = useCanvasesQuery();
  const items: Canvas[] = canvasesQuery.data ?? [];
  const focusedImage = items.find((item) => item.canvasId === focusedImageId);

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
