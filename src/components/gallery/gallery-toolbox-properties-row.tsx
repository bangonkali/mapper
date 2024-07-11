import { FlattenedDictionary } from "../../utils/flatten";
import { colors } from "../../consts/colors";
import { GalleryToolboxPropertiesRowPropsOnChangeEvent } from "./gallery-toolbox-properties-row-props-on-change-event";
import { GalleryToolboxPropertiesTemplate } from "./gallery-toolbox-properties-template";

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
  const rowHeight = 18;
  const columResizerWidth = 3;
  const minWidthBothSides = 60;

  const label = template?.label ?? item.key;
  const readOnly = template?.readonly;

  return (
    <div
      key={`${item.key}-${item.value}`}
      style={{
        width: width,
        display: "flex",
        borderBottom: `1px solid ${colors.borders}`,
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
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          paddingLeft: "2px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          width: columResizerWidth,
          height: rowHeight,
          backgroundColor: onHoverKeyColumnResizer
            ? colors.splitter
            : "transparent",
          cursor: "col-resize",
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
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          borderLeft: `1px solid ${colors.borders}`,
          paddingLeft: "2px",
        }}
      >
        <input
          readOnly={readOnly}
          name={item.key}
          type="text"
          defaultValue={item.value?.toLocaleString()}
          onBlur={(e) => {
            if (onChange) {
              onChange({
                current: {
                  key: item.key,
                  value: item.value?.toLocaleString() ?? "",
                },
                new: {
                  key: item.key,
                  value: e.target.value,
                },
              });
            }
          }}
          style={{
            width: width - keyColumnWidth - columResizerWidth - 4,
            height: rowHeight,
            border: "none",
            outline: "none",
            padding: "0px",
            margin: "0px",
            fontSize: "12px",
            fontFamily: "Roboto",
          }}
        />
      </div>
    </div>
  );
};
