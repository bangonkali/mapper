import { useQueryClient, useMutation } from '@tanstack/react-query';
import { putAnnotations } from '../../services/annotations/put-annotations';

export const usePutAnnotation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putAnnotations,
    onSuccess: () => {
      // TODO: fix! this is rather greedy, but it's a simple way to invalidate all queries
      return queryClient.invalidateQueries();
    },
  });
};
