import { useQuery } from '@tanstack/react-query';
import {
  fetchAnnotations,
  FetchAnnotationsParams,
} from '../../services/annotations/fetch-annotations';

export const getUseAnnotationsQueryKey = (params: FetchAnnotationsParams) => {
  return ['annotations', params];
};

export const useAnnotationsQuery = (params: FetchAnnotationsParams) => {
  return useQuery({
    queryKey: getUseAnnotationsQueryKey(params),
    queryFn: () => fetchAnnotations(params),
  });
};
