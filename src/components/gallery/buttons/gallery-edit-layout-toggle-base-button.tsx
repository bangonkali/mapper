import { produce } from "immer";
import { colors } from "../../../consts/colors";
import { galleryStoreLayout } from "../../../data/store/gallery-store";
import { GalleryComputedLayout } from "../../../models/app/app-layout";
import icoDockRight from "../../../assets/ico-dock-right.svg";
import icoDockLeft from "../../..//assets/ico-dock-left.svg";
import icoDockBottom from "../../..//assets/ico-dock-bottom.svg";

export type GalleryEditLayoutToggleBaseButtonProps = {
  layout: GalleryComputedLayout;
  side: "left" | "right" | "bottom";
};

export const GalleryEditLayoutToggleBaseButton: React.FC<
  GalleryEditLayoutToggleBaseButtonProps
> = ({ layout, side }) => {
  const icoSize = 18;
  const ico = {
    left: icoDockLeft,
    right: icoDockRight,
    bottom: icoDockBottom,
  };
  return (
    <div
      style={{
        width: 24,
        height: 24,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 2,
        backgroundColor: layout.docks[side].visible
          ? colors.headerBackground
          : "transparent",
        borderRadius: 4,
      }}
      onClick={() => {
        galleryStoreLayout.setState((state) => {
          return produce(state, (draft) => {
            draft.gallery.layout.constraint.docks[side].visible =
              !draft.gallery.layout.constraint.docks[side].visible;
          });
        });
      }}
    >
      <img src={ico[side]} width={icoSize} height={icoSize} alt="logo" />
    </div>
  );
};
