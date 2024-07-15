import { Store } from "@tanstack/react-store";
import { GalleryStoreLayout } from "../../gallery-store";
import { produce } from "immer";
import { GalleryComputedLayout } from "../../../../models/app/app-layout";
import { Size } from "../../../../models/Size";

export const onSplitterMouseMove = (
  side: "left" | "right",
  parent: Size,
  computed: GalleryComputedLayout,
  galleryStoreLayout: Store<GalleryStoreLayout>,
  e: React.MouseEvent<HTMLDivElement, MouseEvent>
) => {
  if (computed.docks[side].splitterEnabled) {
    galleryStoreLayout.setState((state) => {
      return produce(state, (draft) => {
        const preferredWidth =
          side === "right" ? parent.width - e.clientX : e.clientX;
        if (
          preferredWidth < draft.gallery.layout.constraint.docks[side].minWidth
        ) {
          draft.gallery.layout.constraint.docks[side].visible = true;
          draft.gallery.layout.constraint.docks[side].desiredWidth =
            draft.gallery.layout.constraint.docks[side].minWidth;
        } else {
          draft.gallery.layout.constraint.docks[side].visible = true;
          draft.gallery.layout.constraint.docks[side].desiredWidth =
            preferredWidth;
        }

        const otherSide = side === "left" ? "right" : "left";
        const workspaceWidth =
          parent.width - preferredWidth - computed.docks[otherSide].width;
        if (workspaceWidth < computed.docks.workspace.minWidth) {
          const maxWidth =
            parent.width -
            computed.docks.workspace.minWidth -
            computed.docks[otherSide].width;
          draft.gallery.layout.constraint.docks[side].desiredWidth = maxWidth;
        }
      });
    });
  }
};
