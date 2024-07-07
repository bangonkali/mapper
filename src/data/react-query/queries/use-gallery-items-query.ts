import { useQuery } from "@tanstack/react-query";
import { fetchGalleryItems } from "../../services/entities/fetch-gallery-items";

export const getUseGalleryItemsQueryKey = () => {
  return ["galleryItems"];
};

export const useGalleryItemsQuery = () => {
  return useQuery({
    queryKey: getUseGalleryItemsQueryKey(),
    queryFn: () => fetchGalleryItems(),
  });
};
