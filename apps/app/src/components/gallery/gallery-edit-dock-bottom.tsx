import React, { useState } from 'react';
import { ReactElement } from 'react';
import { GalleryEditDockProps } from './gallery-edit-dock-props';
import { GalleryEditDockKeys } from '../../data/store/gallery-edit-dock-store';
import { colors } from '../../consts/colors';

export type GalleryEditDockBottomProps = {
  height: number;
  width: number;
  children: ReactElement<GalleryEditDockProps>[];
  selectedKey: GalleryEditDockKeys;
  onSelectedKeyChanged?: (key: GalleryEditDockKeys) => void | undefined;
  onMinimizeClick?: () => void | undefined;
};

export const GalleryEditDockBottom: React.FC<GalleryEditDockBottomProps> = ({
  height,
  width,
  children,
  selectedKey,
  onSelectedKeyChanged,
  onMinimizeClick,
}) => {
  const titleHeight = 20;
  const borderTop = 1;
  const selectedBarHeight = 2;

  const [isOnHoverMinimize, setIsOnHoverMinimize] = useState(false);

  let newChild: React.ReactElement<GalleryEditDockProps> | undefined;

  const titles = React.Children.map(children, (child) => {
    const selected = child.key === selectedKey;
    if (selected) {
      newChild = React.cloneElement(child, {
        ...child.props,
        height: height - titleHeight,
      });
    }
    return (
      <div
        key={child.key}
        style={{
          height: titleHeight - selectedBarHeight,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: selected
            ? colors.headerForeground
            : colors.headerForegroundInactive,
          // backgroundColor: selected ? "white" : undefined,
        }}
        onClick={() => {
          if (onSelectedKeyChanged) {
            onSelectedKeyChanged(child.key as GalleryEditDockKeys);
          }
        }}
      >
        <div
          style={{
            paddingLeft: 8,
            paddingRight: 8,
            position: 'relative',
            top: selectedBarHeight,
          }}
        >
          {child.props.title}
        </div>
        <div
          style={{
            position: 'relative',
            width: '100%',
            bottom: -selectedBarHeight,
            height: selectedBarHeight,
            minHeight: selectedBarHeight,
            backgroundColor: selected ? colors.headerForeground : undefined,
          }}
        ></div>
      </div>
    );
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: width,
        height: height,
      }}
    >
      {/* header */}
      <div
        style={{
          height: titleHeight - borderTop,
          display: 'flex',
          flexDirection: 'row',
          borderTop: `${borderTop}px solid ${colors.border}`,
          backgroundColor: colors.headerBackground,
        }}
      >
        {titles}
        <div
          style={{
            marginTop: 3,
            position: 'absolute',
            right: 3,
            height: titleHeight - borderTop - 6,
            width: titleHeight - borderTop - 6,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            backgroundColor: isOnHoverMinimize ? 'white' : 'transparent',
          }}
          onMouseOver={() => {
            setIsOnHoverMinimize(true);
          }}
          onMouseLeave={() => {
            setIsOnHoverMinimize(false);
          }}
          onClick={onMinimizeClick}
        >
          -
        </div>
      </div>

      {/* content */}
      {newChild}
    </div>
  );
};
