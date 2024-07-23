import { colors } from '../../consts/colors';
import { galleryStoreLayout } from '../../data/store/gallery-store';
import { GalleryComputedLayout } from '../../models/app/app-layout';
import { GalleryToolboxContainer } from './gallery-toolbox-container';
import { produce } from 'immer';

export type GalleryDockProps = {
  galleryItemId?: string | undefined;
  layout: GalleryComputedLayout;
  side: 'left' | 'right';
};

export const GalleryDock: React.FC<GalleryDockProps> = ({
  galleryItemId,
  layout,
  side,
}) => {
  const columResizerWidth = 3;
  const width = layout.docks[side].width;
  const childWidth = width - columResizerWidth;
  const childHeight = layout.docks[side].height;

  const onHoverKeyColumnResizer = layout.docks[side].splitterVisible;
  const splitterEnabled = layout.docks[side].splitterEnabled;

  const onSplitterEnabledChanged = (
    side: 'left' | 'right',
    enabled: boolean
  ) => {
    galleryStoreLayout.setState((state) => {
      return produce(state, (draft) => {
        draft.gallery.layout.constraint.docks[side].splitterEnabled = enabled;
      });
    });
  };

  const onHoverKeyColumnResizerChanged = (
    side: 'left' | 'right',
    enabled: boolean
  ) => {
    galleryStoreLayout.setState((state) => {
      return produce(state, (draft) => {
        draft.gallery.layout.constraint.docks[side].splitterVisible = enabled;
      });
    });
  };

  return (
    <div
      className="gallery-dock ns"
      style={{
        position: 'relative',
        display: 'absolute',
        top: 0,
        left: 0,
        width: layout.docks[side].width,
        height: childHeight,
      }}
    >
      <div
        className="gallery-dock-container"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: width,
          height: childHeight,
        }}
      >
        <GalleryToolboxContainer
          galleryItemId={galleryItemId}
          side={side}
          width={width}
          height={childHeight}
        />
      </div>
      <div
        className="gallery-dock-splitter"
        key={`gallery-dock-splitter-${side}`}
        style={{
          position: 'absolute',
          left: side === 'right' ? 0 : childWidth,
          top: 0,
          width: columResizerWidth,
          height: childHeight,
          cursor: 'col-resize',
          backgroundColor: onHoverKeyColumnResizer
            ? colors.splitter
            : 'transparent',
        }}
        onMouseLeave={() => {
          if (!splitterEnabled) {
            onHoverKeyColumnResizerChanged(side, false);
          }
        }}
        onMouseOver={() => onHoverKeyColumnResizerChanged(side, true)}
        onMouseDown={() => onSplitterEnabledChanged(side, true)}
      ></div>
    </div>
  );
};
