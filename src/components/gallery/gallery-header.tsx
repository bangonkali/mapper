import { colors } from "../../consts/colors";
import { produce } from "immer";
import { focusedImageStore } from "../../data/store/gallery-items-store";
import { galleryStoreLayout } from "../../data/store/gallery-store";

export type GalleryHeaderProps = {
  height: number;
  width: number;
};

export const GalleryHeader: React.FC<GalleryHeaderProps> = ({
  height,
  width,
}) => {
  const border = 1;
  return (
    <div
      style={{
        height: `${height - border}px`,
        width: `${width}px`,
        borderBottom: `${border}px solid ${colors.borders}`,
        display: "flex",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <p>Header</p>
      <button
        onClick={() => {
          focusedImageStore.setState(() => null);
        }}
      >
        Gallery
      </button>
      <button
        onClick={() => {
          galleryStoreLayout.setState((state) => {
            return produce(state, (draft) => {
              draft.gallery.layout.constraint.docks.left.visible =
                !draft.gallery.layout.constraint.docks.left.visible;
            });
          });
        }}
        title="Toggle Left"
      >
        Toggle Left
      </button>
      <button
        onClick={() => {
          galleryStoreLayout.setState((state) => {
            return produce(state, (draft) => {
              draft.gallery.layout.constraint.docks.right.visible =
                !draft.gallery.layout.constraint.docks.right.visible;
            });
          });
        }}
      >
        Toggle Right
      </button>
    </div>
  );
};
