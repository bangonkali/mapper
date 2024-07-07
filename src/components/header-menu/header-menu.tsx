import { Link } from "@tanstack/react-router";

export const HeaderMenu: React.FC = () => {
  return (
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/gallery" className="[&.active]:font-bold">
        Gallery
      </Link>
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
    </div>
  );
};
