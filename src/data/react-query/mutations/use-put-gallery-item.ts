import { useQueryClient, useMutation } from "@tanstack/react-query";
import { putGalleryItems } from "../../services/entities/put-gallery-item";
import { getUseGalleryItemQueryKey } from "../queries/use-gallery-item-query";
import { getUseGalleryItemsQueryKey } from "../queries/use-gallery-items-query";

export const usePutGalleryItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putGalleryItems,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: getUseGalleryItemQueryKey({
          galleryItemId: variables.data.galleryItemId,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: getUseGalleryItemsQueryKey(),
      });
    },
  });
};
