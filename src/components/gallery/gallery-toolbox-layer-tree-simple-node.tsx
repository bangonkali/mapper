import { colors } from '../../consts/colors';
import { ChevronDown } from '../shapes/chevron-down';
import { ChevronRight } from '../shapes/chevron-right';

export type GalleryToolboxLayerTreeSimpleNodeProps = {
  width: number;
  level: number;
  title: string;
  isVisible: boolean;
  isExpanded: boolean;
  isSelected?: boolean | undefined;
  onNodeClick?: () => void | undefined;
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
  isSelected,
  onNodeClick,
  onVisibleCheckboxClick,
  onExpandToggleClick,
}) => {
  const scrollbarRight = 12;
  const rowHeight = 18;
  const iconWidth = rowHeight - 3;
  const levelPadding = 10 * level;

  const checkboxWidth = onVisibleCheckboxClick !== undefined ? 13 : 0;
  const descriptionWidth =
    width - levelPadding - scrollbarRight - checkboxWidth;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: width,
        height: rowHeight,
        backgroundColor: isSelected ? colors.selected : 'transparent',
      }}
    >
      <div
        style={{
          display: 'flex',
          paddingLeft: levelPadding,
          width: descriptionWidth,
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
          }}
          onClick={() => {
            if (onNodeClick) {
              onNodeClick();
            }
          }}
        >
          {title}
        </div>
      </div>
      {onVisibleCheckboxClick ? (
        <input
          type="checkbox"
          checked={isVisible}
          readOnly
          onClick={() => {
            onVisibleCheckboxClick();
          }}
        />
      ) : undefined}
    </div>
  );
};
