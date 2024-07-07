import { Store } from "@tanstack/react-store";
import { GalleryStoreLayout } from "../../gallery-store";
import { produce } from "immer";

export const onSplitterEnd = (
  galleryStoreLayout: Store<GalleryStoreLayout>
) => {
  galleryStoreLayout.setState((state) => {
    return produce(state, (draft) => {
      draft.gallery.layout.constraint.docks.right.splitterEnabled = false;
      draft.gallery.layout.constraint.docks.left.splitterEnabled = false;
    });
  });
};
