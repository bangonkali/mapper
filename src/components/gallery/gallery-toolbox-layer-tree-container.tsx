import { useState } from 'react';
import { GalleryItem } from '../../entities/gallery-item/gallery-item-schema';
import { GalleryToolboxPropertiesHeader } from './gallery-toolbox-properties-header';
import { GalleryToolboxLayerTreeAnnotationsTrunk } from './gallery-toolbox-layer-tree-annotations-trunk';
import { GalleryToolboxLayerTreeTagTypesTrunk } from './gallery-toolbox-layer-tree-tag-types-trunk';

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

  return (
    <div
      className="ns"
      style={{ width: width }}
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
          <GalleryToolboxLayerTreeAnnotationsTrunk
            width={width}
            height={height}
            focusedImage={focusedImage}
            selectedAnnotationId={selectedAnnotationId}
          />
          <GalleryToolboxLayerTreeTagTypesTrunk
            width={width}
            height={height}
            focusedImage={focusedImage}
            selectedAnnotationId={selectedAnnotationId}
          />
        </>
      ) : null}
    </div>
  );
};
