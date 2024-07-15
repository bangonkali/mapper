import { createLazyFileRoute } from "@tanstack/react-router";
import { GalleryItemContainer } from "../components/page-container/gallery-item-container";

export const Route = createLazyFileRoute("/gallery/item/$galleryItemId")({
  component: () => {
    return <GalleryItemContainer />;
  },
});
