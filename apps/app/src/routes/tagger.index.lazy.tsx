import { createLazyFileRoute } from '@tanstack/react-router';
import { TaggerIndexPage } from '@dash/tagger-ui';

export const Route = createLazyFileRoute('/tagger/')({
  component: () => {
    return <TaggerIndexPage />;
  },
});
