import { colors } from "../../consts/colors";
import { produce } from "immer";
import { galleryStoreLayout } from "../../data/store/gallery-store";
import { useNavigate } from "@tanstack/react-router";
import { GalleryComputedLayout } from "../../models/app/app-layout";
import icoDockBottom from "../../assets/ico-dock-bottom.svg";
import icoDockLeft from "../../assets/ico-dock-left.svg";
import icoDockRight from "../../assets/ico-dock-right.svg";
import icoDockGrid from "../../assets/ico-grid.svg";

export type GalleryHeaderProps = {
  height: number;
  width: number;
  layout: GalleryComputedLayout;
};

export const GalleryHeader: React.FC<GalleryHeaderProps> = ({
  height,
  width,
  layout,
}) => {
  const icoSize = 18;
  const border = 1;
  const navigate = useNavigate({ from: "/gallery/item/$galleryItemId" });
  return (
    <div
      className="ns"
      style={{
        height: height - border,
        width: width,
        borderBottom: `${border}px solid ${colors.borders}`,
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: colors.selected,
      }}
    >
      <div
        style={{
          marginLeft: 10,
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "red",
          }}
          onClick={() => {
            navigate({ to: "/gallery" });
          }}
        >
          <img src={icoDockGrid} width={icoSize} height={icoSize} alt="logo" />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          marginLeft: "auto",
          marginRight: 10,
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 2,
            backgroundColor: layout.docks.left.visible
              ? colors.headerBackground
              : "transparent",
            // backgroundColor: "red",
          }}
          onClick={() => {
            galleryStoreLayout.setState((state) => {
              return produce(state, (draft) => {
                draft.gallery.layout.constraint.docks.left.visible =
                  !draft.gallery.layout.constraint.docks.left.visible;
              });
            });
          }}
        >
          <img src={icoDockLeft} width={icoSize} height={icoSize} alt="logo" />
        </div>
        <div
          style={{
            width: 24,
            height: 24,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 2,
            backgroundColor: layout.docks.bottom.visible
              ? colors.headerBackground
              : "transparent",
            // backgroundColor: "red",
          }}
          onClick={() => {
            galleryStoreLayout.setState((state) => {
              return produce(state, (draft) => {
                draft.gallery.layout.constraint.docks.bottom.visible =
                  !draft.gallery.layout.constraint.docks.bottom.visible;
              });
            });
          }}
        >
          <img
            src={icoDockBottom}
            width={icoSize}
            height={icoSize}
            alt="logo"
          />
        </div>

        <div
          style={{
            width: 24,
            height: 24,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 2,
            backgroundColor: layout.docks.right.visible
              ? colors.headerBackground
              : "transparent",
            borderRadius: 4,
          }}
          onClick={() => {
            galleryStoreLayout.setState((state) => {
              return produce(state, (draft) => {
                draft.gallery.layout.constraint.docks.right.visible =
                  !draft.gallery.layout.constraint.docks.right.visible;
              });
            });
          }}
        >
          <img src={icoDockRight} width={icoSize} height={icoSize} alt="logo" />
        </div>
      </div>
    </div>
  );
};
