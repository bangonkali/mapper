import {
  GalleryWorkspaceView,
  GalleryComputedLayout,
} from "../../../models/app/app-layout";
import { GalleryStoreLayout } from "../gallery-store";

export type GalleryComputedLayoutProps = {
  state: GalleryStoreLayout;
  width: number;
  height: number;
  focusedImageId: string | null;
};

export const computeGalleryLayout = ({
  width,
  height,
  state,
  focusedImageId,
}: GalleryComputedLayoutProps) => {
  const header = {
    width: width,
    height: state.gallery.layout.constraint.header.visible
      ? state.gallery.layout.constraint.header.desiredHeight
      : 0,
    visible: state.gallery.layout.constraint.header.visible,
  };

  const footer = {
    width: width,
    height: state.gallery.layout.constraint.footer.visible
      ? state.gallery.layout.constraint.footer.desiredHeight
      : 0,
    visible: state.gallery.layout.constraint.footer.visible,
  };

  const right = {
    splitterVisible:
      state.gallery.layout.constraint.docks.right.splitterVisible,
    minWidth: state.gallery.layout.constraint.docks.right.minWidth,
    width: state.gallery.layout.constraint.docks.right.visible
      ? state.gallery.layout.constraint.docks.right.desiredWidth
      : 0,
    height: height - header.height - footer.height,
    visible: state.gallery.layout.constraint.docks.right.visible,
    splitterEnabled:
      state.gallery.layout.constraint.docks.right.splitterEnabled,
  };

  const left = {
    splitterVisible: state.gallery.layout.constraint.docks.left.splitterVisible,
    minWidth: state.gallery.layout.constraint.docks.left.minWidth,
    width: state.gallery.layout.constraint.docks.left.visible
      ? state.gallery.layout.constraint.docks.left.desiredWidth
      : 0,
    height: height - header.height - footer.height,
    visible: state.gallery.layout.constraint.docks.left.visible,
    splitterEnabled: state.gallery.layout.constraint.docks.left.splitterEnabled,
  };

  const bottom = {
    width: width - left.width - right.width,
    height: state.gallery.layout.constraint.docks.bottom.visible
      ? state.gallery.layout.constraint.docks.bottom.desiredHeight
      : 0,
    visible: state.gallery.layout.constraint.docks.bottom.visible,
  };

  const workspace = {
    width: width - left.width - right.width,
    height: height - header.height - footer.height - bottom.height,
    resizing: right.splitterEnabled,
    minWidth: state.gallery.layout.constraint.docks.workspace.minWidth,
    view: !focusedImageId
      ? ("masonry" as GalleryWorkspaceView)
      : ("editor" as GalleryWorkspaceView),
    focusImageId: focusedImageId,
  };

  const computed: GalleryComputedLayout = {
    header,
    footer,
    docks: {
      left,
      right,
      bottom,
      workspace,
    },
  };

  return computed;
};
