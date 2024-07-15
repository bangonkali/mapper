import { colors } from "../../consts/colors";
import { produce } from "immer";
import { focusedImageStore } from "../../data/store/gallery-items-store";
import { galleryStoreLayout } from "../../data/store/gallery-store";
import { useNavigate } from "@tanstack/react-router";

export type GalleryHeaderProps = {
  height: number;
  width: number;
};

export const GalleryHeader: React.FC<GalleryHeaderProps> = ({
  height,
  width,
}) => {
  const border = 1;
  const navigate = useNavigate({ from: "/selected-image/$galleryId" });
  return (
    <div
      style={{
        height: height - border,
        width: width,
        borderBottom: `${border}px solid ${colors.borders}`,
        display: "flex",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <p>Header</p>
      <button
        onClick={() => {
          navigate({ to: "/gallery" });
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
