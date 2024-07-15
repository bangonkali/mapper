import styles from "./gallery.module.css";
import { useStore } from "@tanstack/react-store";
import { GalleryMasonryView } from "./gallery-masonry-view";
import { GalleryFooter } from "./gallery-footer";
import { GalleryHeader } from "./gallery-header";
import { galleryStoreLayout } from "../../data/store/gallery-store";
import { onSplitterEnd } from "../../data/store/mutations/splitter/on-splitter-end";
import { onSplitterMouseMoveAll } from "../../data/store/mutations/splitter/on-splitter-mouse-move-all";
import { computeGalleryLayout } from "../../data/store/selectors/compute-gallery-layout";

type GalleryProps = {
  height: number;
  width: number;
};

export const Gallery: React.FC<GalleryProps> = (props) => {
  const layout = useStore(galleryStoreLayout, (state) => {
    return computeGalleryLayout({ ...props, state });
  });

  return (
    <div
      className={styles.gallery}
      style={{
        overflow: "hidden",
        height: props.height,
        width: props.width,
      }}
    >
      <GalleryHeader
        width={layout.header.width}
        height={layout.header.height}
      />
      <div
        className={styles.content}
        style={{
          cursor: layout.docks.workspace.resizing ? "col-resize" : "default",
        }}
        onMouseLeave={() => onSplitterEnd(galleryStoreLayout)}
        onMouseUp={() => onSplitterEnd(galleryStoreLayout)}
        onMouseMove={(e) => {
          onSplitterMouseMoveAll(
            { width: props.width, height: props.height },
            layout,
            galleryStoreLayout,
            e
          );
        }}
      >
        <div className={styles.workspace} style={{ ...props }}>
          <GalleryMasonryView {...props} />
        </div>
      </div>
      <GalleryFooter
        height={layout.footer.height}
        width={layout.footer.width}
      />
    </div>
  );
};
