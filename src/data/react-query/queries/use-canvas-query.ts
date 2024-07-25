import { useQuery } from '@tanstack/react-query';
import {
  FetchCanvasParams,
  fetchCanvas,
} from '../../services/canvas/fetch-canvas';
import { useCanvasesQuery } from './use-canvases-query';

export const getUseCanvasQueryKey = (params: FetchCanvasParams) => {
  return ['canvas', params];
};

export const useCanvasQuery = (params: FetchCanvasParams) => {
  const canvasesQuery = useCanvasesQuery();
  return useQuery({
    queryKey: getUseCanvasQueryKey(params),
    queryFn: () => fetchCanvas(params),
    initialData: canvasesQuery.data?.find((e) => e.canvasId === params.canvasId)
      ? undefined
      : null,
  });
};
