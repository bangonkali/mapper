import { useState } from 'react';
import { Canvas } from '../../entities/canvas/canvas-schema';
import { GalleryToolboxPropertiesHeader } from './gallery-toolbox-properties-header';
import { GalleryToolboxLayerTreeAnnotationsTrunk } from './gallery-toolbox-layer-tree-annotations-trunk';
import { GalleryToolboxLayerTreeTagTypesTrunk } from './gallery-toolbox-layer-tree-tag-types-trunk';

export type GalleryToolboxLayerTreeContainerProps = {
  width: number;
  height: number;
  focusedImage: Canvas;
  selectedAnnotationId: string | null;
};

export const GalleryToolboxLayerTreeContainer: React.FC<
  GalleryToolboxLayerTreeContainerProps
> = ({ width, height, focusedImage, selectedAnnotationId }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div
      style={{ width: width, overflow: 'hidden' }}
      key={focusedImage.canvasId}
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
        <div
          style={{
            height: height - 20,
            overflowY: 'auto',
            overflowX: 'auto',
          }}
        >
          <GalleryToolboxLayerTreeAnnotationsTrunk
            width={width - 6}
            height={height}
            focusedImage={focusedImage}
            selectedAnnotationId={selectedAnnotationId}
          />
          <GalleryToolboxLayerTreeTagTypesTrunk
            width={width - 6}
            height={height}
            focusedImage={focusedImage}
            selectedAnnotationId={selectedAnnotationId}
          />
        </div>
      ) : null}
    </div>
  );
};
