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
    <div>
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
        {children}
      </div>
    </div>
  );
};
