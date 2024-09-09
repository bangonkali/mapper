import { createLazyFileRoute } from '@tanstack/react-router';
import { HeaderMenu } from '../components/header-menu/header-menu';
import { MapperPropertyGrid } from '@dash/mapper-ui';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <>
      <HeaderMenu />
      <div className="p-2">
        <h3>Welcome Home!</h3>
        <MapperPropertyGrid />
      </div>
    </>
  );
}
