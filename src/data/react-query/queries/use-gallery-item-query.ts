import { useQuery } from "@tanstack/react-query";
import {
  FetchGalleryItemParams,
  fetchGalleryItem,
} from "../../services/entities/fetch-gallery-item";
import { useGalleryItemsQuery } from "./use-gallery-items-query";

export const getUseGalleryItemQueryKey = (params: FetchGalleryItemParams) => {
  return ["galleryItem", params];
};

export const useGalleryItemQuery = (params: FetchGalleryItemParams) => {
  const galleryItemsQuery = useGalleryItemsQuery();
  return useQuery({
    queryKey: getUseGalleryItemQueryKey(params),
    queryFn: () => fetchGalleryItem(params),
    initialData: galleryItemsQuery.data?.find(
      (e) => e.galleryItemId === params.galleryItemId
    )
      ? undefined
      : null,
  });
};
