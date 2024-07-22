import { Image } from 'react-konva';
import { gallerySelectedAnnotationStore } from '../../data/store/gallery-items-store';

export type GalleryEditFocusedItemProps = {
  image: HTMLImageElement | undefined;
};

export const GalleryEditFocusedItem: React.FC<GalleryEditFocusedItemProps> = ({
  image,
}) => {
  return (
    <Image
      image={image}
      onClick={() => {
        gallerySelectedAnnotationStore.setState(() => null);
      }}
    />
  );
};
