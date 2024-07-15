import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  fetchAnnotation,
  FetchAnnotationParams,
} from "../../services/annotations/fetch-annotation";
import { useAnnotationsQuery } from "./use-annotations-query";

export const getUseAnnotationQueryKey = (params: FetchAnnotationParams) => {
  return ["annotation", params];
};

export const useAnnotationQuery = (params: FetchAnnotationParams) => {
  const annotationQuery = useAnnotationsQuery({
    galleryItemId: params.galleryItemId,
  });
  const initialData = annotationQuery.data?.find(
    (annotation) => annotation.annotationId === params.annotationId
  )
    ? undefined
    : null;

  return useQuery({
    queryKey: getUseAnnotationQueryKey(params),
    queryFn: () => fetchAnnotation(params),
    initialData: initialData,
    placeholderData: keepPreviousData,
  });
};
