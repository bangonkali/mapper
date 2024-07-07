import { colors } from "../../consts/colors";
import { galleryStoreLayout } from "../../data/store/gallery-store";
import { GalleryComputedLayout } from "../../models/app/app-layout";
import { GalleryToolboxContainer } from "./gallery-toolbox-container";
import { produce } from "immer";

export type GalleryDockProps = {
  layout: GalleryComputedLayout;
  side: "left" | "right";
};

export const GalleryDock: React.FC<GalleryDockProps> = ({ layout, side }) => {
  const splitterWidth = 1;
  const childWidth = layout.docks[side].width - splitterWidth;
  const childHeight = layout.docks[side].height;

  return (
    <div
      style={{
        flexDirection: side === "right" ? "row" : "row-reverse",
        display: "flex",
        width: `${layout.docks[side].width}px`,
        height: `${layout.docks[side].height}px`,
      }}
    >
      <div
        style={{
          width: `${splitterWidth}px`,
          height: `${layout.docks[side].height}px`,
          backgroundColor: colors.borders,
          cursor: "col-resize",
        }}
        onMouseDown={() => {
          galleryStoreLayout.setState((state) => {
            return produce(state, (draft) => {
              draft.gallery.layout.constraint.docks[side].splitterEnabled =
                true;
            });
          });
        }}
      ></div>
      <div
        style={{
          width: `${childWidth}px`,
          height: `${childHeight}px`,
        }}
      >
        <GalleryToolboxContainer
          side={side}
          width={childWidth}
          height={childHeight}
        />
      </div>
    </div>
  );
};
