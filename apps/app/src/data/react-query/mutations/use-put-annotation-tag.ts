import { useQueryClient, useMutation } from '@tanstack/react-query';
import { putAnnotationTags } from '../../services/annotation-tags/put-annotation-tag';

export const usePutAnnotationTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putAnnotationTags,
    onSuccess: () => {
      // TODO: fix! this is rather greedy, but it's a simple way to invalidate all queries
      return queryClient.invalidateQueries();
    },
  });
};
