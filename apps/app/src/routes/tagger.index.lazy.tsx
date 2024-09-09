import { createLazyFileRoute } from '@tanstack/react-router';
import { TaggerIndexPage } from '@tagger/ui';

export const Route = createLazyFileRoute('/tagger/')({
  component: () => {
    return <TaggerIndexPage />;
  },
});
