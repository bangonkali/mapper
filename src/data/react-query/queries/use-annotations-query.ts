import { useQuery } from '@tanstack/react-query';
import {
  fetchCanvasAnnotations,
  FetchCanvasAnnotationsParams,
} from '../../services/annotations/fetch-canvas-annotations';

export const getUseAnnotationsQueryKey = (
  params: FetchCanvasAnnotationsParams
) => {
  return ['annotations', params];
};

export const useAnnotationsQuery = (params: FetchCanvasAnnotationsParams) => {
  return useQuery({
    queryKey: getUseAnnotationsQueryKey(params),
    queryFn: () => fetchCanvasAnnotations(params),
  });
};
