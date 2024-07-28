import { useQuery } from '@tanstack/react-query';
import {
  FetchAnnotationTagsParams,
  fetchAnnotationTags,
} from '../../services/annotation-tags/fetch-annotation-tags';

export const getUseAnnotationTagsQueryKey = (
  params: FetchAnnotationTagsParams
) => {
  return ['annotationTags', params];
};

export const useAnnotationTagsQuery = (params: FetchAnnotationTagsParams) => {
  return useQuery({
    queryKey: getUseAnnotationTagsQueryKey(params),
    queryFn: () => fetchAnnotationTags(params),
  });
};
