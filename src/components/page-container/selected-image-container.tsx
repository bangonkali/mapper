import { useStore } from "@tanstack/react-store";
import { useWindowSize } from "usehooks-ts";
import { galleryStoreLayout } from "../../data/store/gallery-store";
import { onSplitterEnd } from "../../data/store/mutations/splitter/on-splitter-end";
import { onSplitterMouseMoveAll } from "../../data/store/mutations/splitter/on-splitter-mouse-move-all";
import { computeGalleryLayout } from "../../data/store/selectors/compute-gallery-layout";
import { GalleryDock } from "../gallery/gallery-dock";
import { GalleryEditView } from "../gallery/gallery-edit-view";
import { GalleryHeader } from "../gallery/gallery-header";
import styles from "../gallery/gallery.module.css";
import { GalleryFooter } from "../gallery/gallery-footer";

export const SelectedImageContainer: React.FC = () => {
  {
    const { width = 0, height = 0 } = useWindowSize();
    const layout = useStore(galleryStoreLayout, (state) => {
      return computeGalleryLayout({ width, height, state });
    });
    return (
      <>
        <div
          className={styles.gallery}
          style={{
            overflow: "hidden",
            height: height,
            width: width,
          }}
        >
          <GalleryHeader
            width={layout.header.width}
            height={layout.header.height}
          />
          <div
            className={styles.content}
            style={{
              cursor: layout.docks.workspace.resizing
                ? "col-resize"
                : "default",
            }}
            onMouseLeave={() => onSplitterEnd(galleryStoreLayout)}
            onMouseUp={() => onSplitterEnd(galleryStoreLayout)}
            onMouseMove={(e) => {
              onSplitterMouseMoveAll(
                { width: width, height: height },
                layout,
                galleryStoreLayout,
                e
              );
            }}
          >
            {layout.docks.left.visible ? (
              <GalleryDock layout={layout} side="left" />
            ) : null}
            <div
              className={styles.workspace}
              style={{
                width: layout.docks.workspace.width,
                height: layout.docks.workspace.height,
              }}
            >
              <GalleryEditView layout={layout} />
            </div>
            {layout.docks.right.visible ? (
              <GalleryDock layout={layout} side="right" />
            ) : null}
          </div>
          <GalleryFooter
            height={layout.footer.height}
            width={layout.footer.width}
          />
        </div>
      </>
    );
  }
};
