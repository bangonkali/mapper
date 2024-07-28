import { useQuery } from '@tanstack/react-query';
import {
  FetchActiveCanvasParams,
  fetchActiveCanvas,
} from '../../services/canvas/fetch-active-canvas';

export const getUseActiveCanvasQueryKey = (params: FetchActiveCanvasParams) => {
  return ['activeCanvas', params];
};

export const useActiveCanvasQuery = (params: FetchActiveCanvasParams) => {
  return useQuery({
    queryKey: getUseActiveCanvasQueryKey(params),
    queryFn: () => fetchActiveCanvas(params),
  });
};
