import { FlattenedDictionary } from '../../utils/flatten';
import { colors } from '../../consts/colors';
import { GalleryToolboxPropertiesRowPropsOnChangeEvent } from './gallery-toolbox-properties-row-props-on-change-event';
import { GalleryToolboxPropertiesTemplate } from './gallery-toolbox-properties-template';
import { useCallback, useState } from 'react';

export type GalleryToolboxPropertiesRowProps = {
  width: number;
  item: FlattenedDictionary;
  onHoverKeyColumnResizer: boolean;
  splitterEnabled: boolean;
  keyColumnWidth: number;
  onSplitterEnabledChanged: (enabled: boolean) => void;
  onHoverKeyColumnResizerChanged: (enabled: boolean) => void;
  onKeyColumnWidthChanged: (width: number) => void;
  onChange?: GalleryToolboxPropertiesRowPropsOnChangeEvent;
  template?: GalleryToolboxPropertiesTemplate | undefined;
};

export const GalleryToolboxPropertiesRow: React.FC<
  GalleryToolboxPropertiesRowProps
> = ({
  width,
  item,
  onChange,
  onSplitterEnabledChanged,
  onHoverKeyColumnResizerChanged,
  onKeyColumnWidthChanged,
  template,
  onHoverKeyColumnResizer,
  splitterEnabled,
  keyColumnWidth,
}) => {
  const initialValue = item.value?.toLocaleString() ?? '';
  const [localValue, setLocalValue] = useState(initialValue);
  const isDirty = initialValue !== localValue;

  const rowHeight = 18;
  const columResizerWidth = 3;
  const minWidthBothSides = 60;

  const label = template?.label ?? item.key;
  const readOnly = template?.readonly;

  const onChangeCallback = useCallback(() => {
    const isChanged = localValue !== initialValue;
    if (onChange && isChanged) {
      onChange({
        current: {
          key: item.key,
          value: initialValue,
        },
        new: {
          key: item.key,
          value: localValue,
        },
      });
    }
  }, [initialValue, item.key, localValue, onChange]);

  return (
    <div
      key={`${item.key}-${item.value}`}
      style={{
        width: width,
        display: 'flex',
        borderBottom: `1px solid ${colors.border}`,
      }}
      onMouseUp={() => {
        onSplitterEnabledChanged(false);
        onHoverKeyColumnResizerChanged(false);
      }}
      onMouseMove={(e) => {
        if (splitterEnabled) {
          const parentLeft = e.currentTarget.getClientRects()[0].left;
          let preferredWidth = e.clientX - parentLeft;
          if (preferredWidth < minWidthBothSides) {
            preferredWidth = minWidthBothSides;
          }
          if (preferredWidth > width - minWidthBothSides) {
            preferredWidth = width - minWidthBothSides;
          }
          onKeyColumnWidthChanged(preferredWidth);
        }
      }}
    >
      <div
        style={{
          width: keyColumnWidth,
          height: rowHeight,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          paddingLeft: 2,
        }}
      >
        <span
          style={{
            position: 'relative',
            top: `${1.5}px`,
          }}
        >
          {label}
        </span>
      </div>
      <div
        style={{
          width: columResizerWidth,
          height: rowHeight,
          backgroundColor: onHoverKeyColumnResizer
            ? colors.splitter
            : 'transparent',
          cursor: 'col-resize',
        }}
        onMouseLeave={() => {
          if (!splitterEnabled) {
            onHoverKeyColumnResizerChanged(false);
          }
        }}
        onMouseOver={() => onHoverKeyColumnResizerChanged(true)}
        onMouseDown={() => onSplitterEnabledChanged(true)}
      ></div>
      <div
        style={{
          width: width - keyColumnWidth - columResizerWidth,
          height: rowHeight,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          borderLeft: `1px solid ${colors.border}`,
          paddingLeft: 2,
        }}
      >
        <input
          readOnly={readOnly}
          name={item.key}
          type="text"
          onChange={(e) => {
            setLocalValue(e.target.value);
          }}
          onBlur={onChangeCallback}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onChangeCallback();
            }
          }}
          style={{
            width: width - keyColumnWidth - columResizerWidth - 4,
            height: rowHeight,
            border: 'none',
            outline: 'none',
            padding: 0,
            margin: 0,
            fontSize: 12,
            fontFamily: 'Roboto',
            backgroundColor: isDirty
              ? colors.dirtyInputBackground
              : 'transparent',
          }}
          value={localValue}
        />
      </div>
    </div>
  );
};
