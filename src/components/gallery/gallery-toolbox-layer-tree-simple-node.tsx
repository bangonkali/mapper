import { colors } from "../../consts/colors";
import { RectangleShape } from "../shapes/rectangle-shape";

export type GalleryToolboxLayerTreeSimpleNodeProps = {
  width: number;
  level: number;
  title: string;
  isVisible: boolean;
  onVisibleCheckboxClick?: () => void | undefined;
};

export const GalleryToolboxLayerTreeSimpleNode: React.FC<
  GalleryToolboxLayerTreeSimpleNodeProps
> = ({ width, level, title, isVisible, onVisibleCheckboxClick }) => {
  const scrollbarRight = 12;
  const rowHeight = 18;
  const iconWidth = rowHeight - 4;
  const checkboxWidth = 20;
  const levelPadding = 10 * level;
  const descriptionWidth = width - iconWidth - levelPadding - scrollbarRight;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: width,
        height: rowHeight,
        borderBottom: `1px solid ${colors.borders}`,
      }}
    >
      <div
        style={{
          paddingLeft: 2 + levelPadding,
          paddingTop: "3px",
          paddingRight: "2px",
          width: iconWidth,
        }}
      >
        <RectangleShape
          width={iconWidth}
          height={iconWidth}
          fill="green"
          stroke="yellow"
        />
      </div>

      <div
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          width: descriptionWidth - checkboxWidth,
        }}
        onClick={() => {
          console.log("toggle expanded state");
        }}
      >
        {title}
      </div>

      <div style={{ width: checkboxWidth }}>
        {/* check box for visibility */}
        <input
          type="checkbox"
          checked={isVisible}
          readOnly
          onClick={() => {
            if (onVisibleCheckboxClick) {
              onVisibleCheckboxClick();
            }
          }}
        />
      </div>
    </div>
  );
};
