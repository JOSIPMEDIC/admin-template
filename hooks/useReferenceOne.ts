import { UseQueryOptions } from "@tanstack/react-query";
import useGetReferenceMany from "./useReferenceMany";

export type GetOneProps<T> = {
  resource: string;
  id: string | undefined;
  queryFilters?: Record<string, string | number | undefined>;
} & Omit<UseQueryOptions<unknown, unknown, T>, "queryKey" | "queryFn">;

const useReferenceOne = <T>({
  resource,
  id,
  queryFilters,
  ...props
}: GetOneProps<T[]>) => {
  const query = useGetReferenceMany<T[]>({
    ids: [id as string],
    resource,
    queryFilters,
    ...props,
  });
  const response = query.data;
  const data = response?.[0];

  return { ...query, data };
};

export default useReferenceOne;
