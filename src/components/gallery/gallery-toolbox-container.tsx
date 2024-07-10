import { useStore } from "@tanstack/react-store";
import { GalleryToolboxAnnotationOverlayProperties } from "./gallery-toolbox-annotation-overlay-properties";
import { GalleryToolboxItemProperties } from "./gallery-toolbox-item-properties";
import {
  gallerySelectedAnnotationStore,
  focusedImageStore,
} from "../../data/store/gallery-items-store";
import { useGalleryItemsQuery } from "../../data/react-query/queries/use-gallery-items-query";
import { useState } from "react";
import { GalleryItem } from "../../entities/gallery-item/gallery-item-schema";
import { useAnnotationsQuery } from "../../data/react-query/queries/use-annotations-query";
import { GalleryToolboxItemAnnotation } from "./gallery-toolbox-item-annotation";

export type GalleryToolboxContainerProps = {
  width: number;
  height: number;
  side: "left" | "right";
};

export const GalleryToolboxContainer: React.FC<
  GalleryToolboxContainerProps
> = ({ height, width, side }) => {
  // find if there is a selected item annotation from the editor view
  const galleryItemsQuery = useGalleryItemsQuery();

  const selectedAnnotationId = useStore(gallerySelectedAnnotationStore);
  const focusedImageId = useStore(focusedImageStore);
  const galleryItems = galleryItemsQuery.data ?? [];
  const focusedGalleryItem = galleryItems.find(
    (item) => item.galleryItemId === focusedImageId
  );
  const annotationItemsQuery = useAnnotationsQuery({
    galleryItemId: focusedGalleryItem?.galleryItemId!,
  });
  const annotationItems = annotationItemsQuery.data ?? [];

  return (
    <div
      style={{
        height: height,
        width: width,
      }}
    >
      {side === "left" ? (
        <GalleryToolboxItemAnnotation
          width={width}
          height={height}
          focusedImage={annotationItems}
        />
      ) : (
        // annotationItemsQuery.data?.map((node) => renderNode(node))
        <>
          {selectedAnnotationId && focusedImageId ? (
            <GalleryToolboxAnnotationOverlayProperties
              width={width}
              height={height}
              selectedAnnotationId={selectedAnnotationId}
              galleryItemId={focusedImageId}
            />
          ) : null}

          <GalleryToolboxItemProperties
            width={width}
            height={height}
            focusedImage={focusedGalleryItem}
          />
        </>
      )}
    </div>
  );
};
