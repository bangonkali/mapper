import { createLazyFileRoute } from "@tanstack/react-router";
import { GalleryContainer } from "../components/page-container/page-container";

export const Route = createLazyFileRoute("/gallery")({
  component: () => {
    return (
      <div>
        <GalleryContainer />
      </div>
    );
  },
});
