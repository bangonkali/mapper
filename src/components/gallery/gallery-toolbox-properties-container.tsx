import { GalleryToolboxPropertiesRowPropsOnChangeEvent } from "./gallery-toolbox-properties-row-props-on-change-event";
import { GalleryToolboxPropertiesTemplate } from "./gallery-toolbox-properties-template";
import { GalleryToolboxPropertiesHeader } from "./gallery-toolbox-properties-header";
import { GalleryToolboxPropertiesRow } from "./gallery-toolbox-properties-row";
import { FlattenedDictionary } from "../../utils/flatten";
import { ZodPathType } from "../../utils/zod/zod-paths";
import { useState } from "react";

export type GalleryToolboxPropertiesContainerProps = {
  onChange?: GalleryToolboxPropertiesRowPropsOnChangeEvent;
  templates: GalleryToolboxPropertiesTemplate[];
  data: FlattenedDictionary[];
  nodes: ZodPathType[];
  height: number;
  width: number;
  title: string;
};

export const GalleryToolboxPropertiesContainer: React.FC<
  GalleryToolboxPropertiesContainerProps
> = ({ onChange, templates, data, nodes, width, title }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [onHoverKeyColumnResizer, setOnHoverKeyColumnResizer] = useState(false);
  const [splitterEnabled, setSplitterEnabled] = useState(false);
  const [keyColumnWidth, setKeyColumnWidth] = useState(width / 2);

  const rows = nodes
    .map((node) => {
      const template = templates.find((t) => t.key === node.path);
      const item = data.find((d) => d.key === node.path);
      return item ? (
        <GalleryToolboxPropertiesRow
          key={item.key}
          width={width}
          item={item}
          onChange={onChange}
          onSplitterEnabledChanged={setSplitterEnabled}
          onHoverKeyColumnResizerChanged={setOnHoverKeyColumnResizer}
          onKeyColumnWidthChanged={setKeyColumnWidth}
          template={template}
          onHoverKeyColumnResizer={onHoverKeyColumnResizer}
          splitterEnabled={splitterEnabled}
          keyColumnWidth={keyColumnWidth}
        />
      ) : undefined;
    })
    .filter((r) => r !== undefined) as JSX.Element[];

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
