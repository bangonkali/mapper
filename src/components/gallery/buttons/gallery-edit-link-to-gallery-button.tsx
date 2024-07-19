import { useNavigate } from "@tanstack/react-router";
import icoDockGrid from "../../../assets/ico-grid.svg";

export const GalleryEditLinkToGalleryButton: React.FC = () => {
  const icoSize = 18;
  const navigate = useNavigate({ from: "/gallery/item/$galleryItemId" });
  return (
    <div
      style={{
        width: 24,
        height: 24,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={() => {
        navigate({ to: "/gallery" });
      }}
    >
      <img src={icoDockGrid} width={icoSize} height={icoSize} alt="logo" />
    </div>
  );
};
