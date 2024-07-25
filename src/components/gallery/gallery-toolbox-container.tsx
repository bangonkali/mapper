import { useStore } from '@tanstack/react-store';
import { GalleryToolboxAnnotationOverlayProperties } from './gallery-toolbox-annotation-overlay-properties';
import { GalleryToolboxItemProperties } from './gallery-toolbox-item-properties';
import { gallerySelectedAnnotationStore } from '../../data/store/canvases-store';
import { useCanvasesQuery } from '../../data/react-query/queries/use-canvases-query';
import { GalleryToolboxLayerTreeContainer } from './gallery-toolbox-layer-tree-container';
import { colors } from '../../consts/colors';

export type GalleryToolboxContainerProps = {
  canvasId?: string | undefined;
  width: number;
  height: number;
  side: 'left' | 'right';
};

export const GalleryToolboxContainer: React.FC<
  GalleryToolboxContainerProps
> = ({ canvasId, height, width, side }) => {
  const canvasesQuery = useCanvasesQuery();
  const selectedAnnotationId = useStore(gallerySelectedAnnotationStore);
  const canvases = canvasesQuery.data ?? [];
  const focusedCanvas = canvases.find((item) => item.canvasId === canvasId);

  const borderWidth = 1;

  return (
    <div
      className="gallery-toolbox-container"
      style={{
        height: height,
        width: width - borderWidth,
        display: 'flex',
        flexDirection: 'column',
        borderLeft: side === 'right' ? `1px solid ${colors.border}` : 'none',
        borderRight: side === 'left' ? `1px solid ${colors.border}` : 'none',
        overflowY: 'auto',
      }}
    >
      {side === 'left' ? (
        <>
          {focusedCanvas ? (
            <GalleryToolboxLayerTreeContainer
              width={width - borderWidth}
              height={height}
              focusedImage={focusedCanvas}
              selectedAnnotationId={selectedAnnotationId}
            />
          ) : null}
        </>
      ) : (
        <>
          {selectedAnnotationId && canvasId ? (
            <GalleryToolboxAnnotationOverlayProperties
              width={width - borderWidth}
              height={height}
              selectedAnnotationId={selectedAnnotationId}
              canvasId={canvasId}
            />
          ) : null}

          <GalleryToolboxItemProperties
            width={width - borderWidth}
            height={height}
            focusedImage={focusedCanvas}
          />
        </>
      )}
    </div>
  );
};
