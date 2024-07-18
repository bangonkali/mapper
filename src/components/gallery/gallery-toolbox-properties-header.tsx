import { colors } from "../../consts/colors";

export type GalleryToolboxPropertiesHeaderProps = {
  width: number;
  title: string;
  isMinimized: boolean;
  onMinimizeClick?: () => void | undefined;
};

export const GalleryToolboxPropertiesHeader: React.FC<
  GalleryToolboxPropertiesHeaderProps
> = ({ width, title, onMinimizeClick, isMinimized }) => {
  const minimizeButtonWidth = 20;
  const height = 20;
  const paddingLeft = 2;

  return (
    <div
      style={{
        paddingLeft: paddingLeft,
        width: width - paddingLeft,
        height: height - 1,
        color: colors.headerForeground,
        backgroundColor: colors.headerBackground,
        display: "flex",
        alignItems: "center",
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <div
        style={{
          width: width - minimizeButtonWidth - paddingLeft,
        }}
      >
        {title}
      </div>

      {onMinimizeClick ? (
        <div
          style={{
            width: minimizeButtonWidth,
            cursor: "pointer",
          }}
          onClick={onMinimizeClick}
        >
          {isMinimized === true ? "+" : "-"}
        </div>
      ) : undefined}
    </div>
  );
};
