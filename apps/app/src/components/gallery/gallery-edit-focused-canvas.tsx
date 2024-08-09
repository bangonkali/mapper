import { Image } from 'react-konva';
import { gallerySelectedAnnotationStore } from '../../data/store/canvases-store';

export type GalleryEditFocusedCanvasProps = {
  image: HTMLImageElement | undefined;
};

export const GalleryEditFocusedCanvas: React.FC<
  GalleryEditFocusedCanvasProps
> = ({ image }) => {
  return (
    <Image
      image={image}
      onClick={() => {
        gallerySelectedAnnotationStore.setState(() => null);
      }}
    />
  );
};
