import { Gallery } from "../gallery/gallery";
import { useWindowSize } from "usehooks-ts";

export const GalleryContainer: React.FC = () => {
  {
    const { width = 0, height = 0 } = useWindowSize();
    return <Gallery width={width} height={height} />;
  }
};
