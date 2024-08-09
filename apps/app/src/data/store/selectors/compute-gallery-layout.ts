import { GalleryComputedLayout } from '../../../models/app/app-layout';
import { GalleryStoreLayout } from '../gallery-store';

export type GalleryComputedLayoutProps = {
  state: GalleryStoreLayout;
  width: number;
  height: number;
};

export const computeGalleryLayout = ({
  width,
  height,
  state,
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
    height: state.gallery.layout.constraint.docks.bottom.visible
      ? state.gallery.layout.constraint.docks.bottom.desiredHeight
      : 0,
    visible: state.gallery.layout.constraint.docks.bottom.visible,
    splitterEnabled:
      state.gallery.layout.constraint.docks.bottom.splitterEnabled,
    splitterVisible:
      state.gallery.layout.constraint.docks.bottom.splitterVisible,
    minHeight: state.gallery.layout.constraint.docks.bottom.minHeight,
  };

  const workspace = {
    width: width - left.width - right.width,
    height: height - header.height - footer.height,
    resizing: right.splitterEnabled,
    minWidth: state.gallery.layout.constraint.docks.workspace.minWidth,
    minHeight: state.gallery.layout.constraint.docks.workspace.minHeight,
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
