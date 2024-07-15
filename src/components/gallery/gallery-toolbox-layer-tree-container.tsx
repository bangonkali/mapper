import { useState } from "react";
import { useAnnotationsQuery } from "../../data/react-query/queries/use-annotations-query";
import { GalleryItem } from "../../entities/gallery-item/gallery-item-schema";
import { GalleryToolboxLayerTreeAnnotationNode } from "./gallery-toolbox-layer-tree-annotation-node";
import { GalleryToolboxPropertiesHeader } from "./gallery-toolbox-properties-header";
import { GalleryToolboxTagsContainer } from "./gallery-toolbox-tags-container";

export type GalleryToolboxLayerTreeContainerProps = {
  width: number;
  height: number;
  focusedImage: GalleryItem;
  selectedAnnotationId: string | null;
};

export const GalleryToolboxLayerTreeContainer: React.FC<
  GalleryToolboxLayerTreeContainerProps
> = ({ width, height, focusedImage, selectedAnnotationId }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const annotationQuery = useAnnotationsQuery({
    galleryItemId: focusedImage.galleryItemId,
  });

  const annotations = annotationQuery.data?.map((annotation) => {
    return (
      <GalleryToolboxLayerTreeAnnotationNode
        level={1}
        key={annotation.annotationId}
        width={width}
        selectedAnnotationId={selectedAnnotationId}
        annotation={annotation}
      />
    );
  });

  return (
    <div
      className="ns"
      style={{ width: width, height: height, overflowY: "auto" }}
      key={focusedImage.galleryItemId}
    >
      <GalleryToolboxPropertiesHeader
        isMinimized={isMinimized}
        width={width}
        title="Layers"
        onMinimizeClick={() => {
          setIsMinimized(!isMinimized);
        }}
      />

      {!isMinimized ? (
        <>
          <div
            style={{
              width: width,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {annotations}
          </div>

          <GalleryToolboxTagsContainer
            width={width}
            focusedImage={focusedImage}
            selectedAnnotationId={selectedAnnotationId}
          />
        </>
      ) : null}
    </div>
  );
};
