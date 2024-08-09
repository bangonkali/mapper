import { GalleryMasonryView } from './gallery-masonry-view';

type GalleryProps = {
  height: number;
  width: number;
};

export const Gallery: React.FC<GalleryProps> = (props) => {
  return <GalleryMasonryView {...props} />;
};
