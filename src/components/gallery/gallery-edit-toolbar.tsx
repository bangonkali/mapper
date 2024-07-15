import { colors } from "../../consts/colors";

export type GalleryEditToolbarProps = {
  height: number;
  width: number;
  children: React.ReactNode;
};
export const GalleryEditToolbar: React.FC<GalleryEditToolbarProps> = ({
  height,
  width,
  children,
}) => {
  return (
    <div
      style={{
        color: colors.headerForeground,
        left: 0,
        top: 0,
        width: width,
        height: height,
        backgroundColor: colors.headerBackground,
        borderBottom: `1px solid ${colors.borders}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};
