import { Store } from "@tanstack/react-store";

export type GalleryEditDockKeys =
  | "galleryEditCarouselDock"
  | "galleryEditAnnotationTagsGridDock"
  | "dock3";

export type GalleryEditDock = "bottom";

export type GalleryEditDockStore = {
  [key in GalleryEditDock]: {
    selectedKey: GalleryEditDockKeys;
    keys: GalleryEditDockKeys[];
  };
};

export const galleryEditDockStore = new Store<GalleryEditDockStore>({
  bottom: {
    selectedKey: "galleryEditCarouselDock",
    keys: [
      "galleryEditCarouselDock",
      "galleryEditAnnotationTagsGridDock",
      "dock3",
    ],
  },
});
