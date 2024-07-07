import { Store } from "@tanstack/react-store";
import { GalleryStoreLayout } from "../../gallery-store";
import { onSplitterMouseMove } from "./on-splitter-mouse-move";
import { GalleryComputedLayout } from "../../../../models/app/app-layout";
import { Size } from "../../../../models/Size";

export const onSplitterMouseMoveAll = (
  parent: Size,
  computed: GalleryComputedLayout,
  galleryStoreLayout: Store<GalleryStoreLayout>,
  e: React.MouseEvent<HTMLDivElement, MouseEvent>
) => {
  onSplitterMouseMove("left", parent, computed, galleryStoreLayout, e);
  onSplitterMouseMove("right", parent, computed, galleryStoreLayout, e);
};
