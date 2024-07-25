import { useQuery } from '@tanstack/react-query';
import { fetchCanvases } from '../../services/canvas/fetch-canvases';

export const getUseCanvasesQueryKey = () => {
  return ['canvases'];
};

export const useCanvasesQuery = () => {
  return useQuery({
    queryKey: getUseCanvasesQueryKey(),
    queryFn: () => fetchCanvases(),
  });
};
