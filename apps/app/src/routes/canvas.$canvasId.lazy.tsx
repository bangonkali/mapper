import { createLazyFileRoute } from '@tanstack/react-router';
import { CanvasPageContainer } from '../components/page-container/canvas-page-container';

export const Route = createLazyFileRoute('/canvas/$canvasId')({
  component: () => {
    return <CanvasPageContainer />;
  },
});
