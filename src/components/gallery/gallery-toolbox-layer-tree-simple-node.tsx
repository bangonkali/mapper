import { ChevronDown } from '../shapes/chevron-down';
import { ChevronRight } from '../shapes/chevron-right';

export type GalleryToolboxLayerTreeSimpleNodeProps = {
  width: number;
  level: number;
  title: string;
  isVisible: boolean;
  isExpanded: boolean;
  onVisibleCheckboxClick?: () => void | undefined;
  onExpandToggleClick?: () => void | undefined;
};

export const GalleryToolboxLayerTreeSimpleNode: React.FC<
  GalleryToolboxLayerTreeSimpleNodeProps
> = ({
  width,
  level,
  title,
  isVisible,
  isExpanded,
  onVisibleCheckboxClick,
  onExpandToggleClick,
}) => {
  const scrollbarRight = 12;
  const rowHeight = 18;
  const iconWidth = rowHeight - 3;
  const checkboxWidth = rowHeight - 3;
  const levelPadding = 20 * level;
  const descriptionWidth = width - iconWidth - levelPadding - scrollbarRight;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: width,
        height: rowHeight,
        // borderBottom: `1px solid ${colors.borders}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          paddingLeft: 2 + levelPadding,
          width: descriptionWidth - checkboxWidth,
        }}
      >
        <div
          style={{
            width: iconWidth - 2,
            height: iconWidth - 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={() => {
            if (onExpandToggleClick) {
              onExpandToggleClick();
            }
          }}
        >
          {isExpanded ? (
            <ChevronDown width={16} height={16} fill={''} stroke={''} />
          ) : (
            <ChevronRight width={16} height={16} fill={''} stroke={''} />
          )}
        </div>
        <div
          style={{
            position: 'relative',
            paddingLeft: 2,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            // backgroundColor: "blue",
          }}
        >
          {title}
        </div>
      </div>
      {onVisibleCheckboxClick ? (
        <div style={{ width: checkboxWidth, height: checkboxWidth }}>
          <input
            type="checkbox"
            checked={isVisible}
            readOnly
            onClick={() => {
              onVisibleCheckboxClick();
            }}
          />
        </div>
      ) : undefined}
    </div>
  );
};
