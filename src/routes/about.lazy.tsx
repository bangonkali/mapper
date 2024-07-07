import { createLazyFileRoute } from "@tanstack/react-router";
import { HeaderMenu } from "../components/header-menu/header-menu";

export const Route = createLazyFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <>
      <HeaderMenu />
      <div className="p-2">Hello from About!</div>
    </>
  );
}
