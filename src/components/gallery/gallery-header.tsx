import { colors } from '../../consts/colors';
import { GalleryComputedLayout } from '../../models/app/app-layout';
import { GalleryEditLayoutToggleBaseButton } from './buttons/gallery-edit-layout-toggle-base-button';
import { GalleryEditLinkToGalleryButton } from './buttons/gallery-edit-link-to-gallery-button';
import { GalleryEditSearchBarButton } from './buttons/gallery-edit-search-bar-button';

export type GalleryHeaderProps = {
  height: number;
  width: number;
  layout: GalleryComputedLayout;
};

export const GalleryHeader: React.FC<GalleryHeaderProps> = ({
  height,
  width,
  layout,
}) => {
  const border = 1;
  const textWidth = Math.min(560, width - 200);
  const itemHeight = 24;

  return (
    <div
      className="ns"
      style={{
        height: height - border,
        width: width,
        borderBottom: `${border}px solid ${colors.border}`,
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.selected,
      }}
    >
      <div
        style={{
          marginLeft: 10,
        }}
      >
        <GalleryEditLinkToGalleryButton />
      </div>

      <div
        style={{
          width: textWidth,
          height: itemHeight,
          left: `calc(50% - ${textWidth / 2}px)`,
          position: 'absolute',
        }}
      >
        <GalleryEditSearchBarButton width={textWidth} height={itemHeight} />
      </div>

      <div
        style={{
          display: 'flex',
          marginLeft: 'auto',
          marginRight: 10,
        }}
      >
        <GalleryEditLayoutToggleBaseButton layout={layout} side="left" />
        <GalleryEditLayoutToggleBaseButton layout={layout} side="bottom" />
        <GalleryEditLayoutToggleBaseButton layout={layout} side="right" />
      </div>
    </div>
  );
};
