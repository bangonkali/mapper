import { useQueryClient, useMutation } from '@tanstack/react-query';
import { undoCanvas } from '../../services/canvas/undo-canvas';

export const useUndoCanvas = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: undoCanvas,
    onSuccess: async () => {
      await queryClient.invalidateQueries();
    },
  });
};
