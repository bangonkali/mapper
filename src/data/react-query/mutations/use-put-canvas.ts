import { useQueryClient, useMutation } from '@tanstack/react-query';
import { putCanvas } from '../../services/entities/put-canvas';
import { getUseCanvasQueryKey } from '../queries/use-canvas-query';
import { getUseCanvasesQueryKey } from '../queries/use-canvases-query';

export const usePutCanvas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putCanvas,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: getUseCanvasQueryKey({
          canvasId: variables.data.canvasId,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: getUseCanvasesQueryKey(),
      });
    },
  });
};
