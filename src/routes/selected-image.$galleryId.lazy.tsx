import { createLazyFileRoute } from "@tanstack/react-router";
import { SelectedImageContainer } from "../components/page-container/selected-image-container";

export const Route = createLazyFileRoute("/selected-image/$galleryId")({
  component: () => {
    return (
      <div>
        <SelectedImageContainer />
      </div>
    );
  },
});
