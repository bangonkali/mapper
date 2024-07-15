import { createLazyFileRoute } from "@tanstack/react-router";
import { GalleryContainer } from "../components/page-container/gallery-container";

export const Route = createLazyFileRoute("/gallery/")({
  component: () => {
    return <GalleryContainer />;
  },
});
