export type GalleryEditToolbarProps = {
  height: number;
  width: number;
};

export const GalleryEditToolbar: React.FC<GalleryEditToolbarProps> = ({
  height,
  width,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: "pink",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      Some toolbar
    </div>
  );
};
