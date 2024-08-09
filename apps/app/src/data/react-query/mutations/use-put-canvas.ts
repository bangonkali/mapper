import { useQueryClient, useMutation } from '@tanstack/react-query';
import { putCanvas } from '../../services/canvas/put-canvas';

export const usePutCanvas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putCanvas,
    onSuccess: () => {
      // TODO: fix! this is rather greedy, but it's a simple way to invalidate all queries
      return queryClient.invalidateQueries();
    },
  });
};
