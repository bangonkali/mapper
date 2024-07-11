import { useState } from "react";
import { FlattenedDictionary } from "../../utils/flatten";
import { colors } from "../../consts/colors";
import { GalleryToolboxPropertiesHeader } from "./gallery-toolbox-properties-header";

export type GalleryToolboxPropertiesChanged = {
  current: {
    key: string;
    value: string;
  };
  new: {
    key: string;
    value: string;
  };
};

export type GalleryToolboxPropertiesContainerProps = {
  width: number;
  height: number;
  data: FlattenedDictionary[];
  title: string;
  onChange?: (evt: GalleryToolboxPropertiesChanged) => void | undefined;
};

export const GalleryToolboxPropertiesContainer: React.FC<
  GalleryToolboxPropertiesContainerProps
> = ({ width, data, title, onChange }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [onHoverKeyColumnResizer, setOnHoverKeyColumnResizer] = useState(false);
  const [splitterEnabled, setSplitterEnabled] = useState(false);
  const [keyColumnWidth, setKeyColumnWidth] = useState(width / 2);

  const rowHeight = 18;
  const columResizerWidth = 3;
  const minWidthBothSides = 60;
  const rows = data.map((item) => {
    return (
      <div
        key={`${item.key}-${item.value}`}
        style={{
          width: width,
          display: "flex",
          borderBottom: `1px solid ${colors.borders}`,
        }}
        onMouseUp={() => {
          setSplitterEnabled(false);
          setOnHoverKeyColumnResizer(false);
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
            setKeyColumnWidth(preferredWidth);
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
          {item.key}
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
              setOnHoverKeyColumnResizer(false);
            }
          }}
          onMouseOver={() => setOnHoverKeyColumnResizer(true)}
          onMouseDown={() => setSplitterEnabled(true)}
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
          {item.key === "annotationId" || item.key === "galleryItemId" ? (
            item.value?.toLocaleString() ?? ""
          ) : (
            <input
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
          )}
        </div>
      </div>
    );
  });

  return (
    <div
      className="ns"
      style={{
        width: width,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <GalleryToolboxPropertiesHeader
        isMinimized={isMinimized}
        width={width}
        title={title}
        onMinimizeClick={() => setIsMinimized(!isMinimized)}
      />
      {isMinimized ? null : (
        <div
          style={{
            width: width,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {rows}
        </div>
      )}
    </div>
  );
};
