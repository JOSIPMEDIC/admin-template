import axios from "axios";
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable guard-for-in */
/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type GetReferenceManyProps<T> = {
    ids: string[]
    resource: string
    queryFilters?: Record<string, string | number | undefined>
  } & Omit<UseQueryOptions<unknown, unknown, T>, "queryKey" | "queryFn">

// TODO: Query filter props

const useGetReferenceMany = <T>({
  ids, resource, enabled, queryFilters, ...props
}: GetReferenceManyProps<T>) => useQuery<unknown, unknown, T>({
  queryKey: [`${resource}-many-reference`, ...ids],
  queryFn: () => new Promise<unknown[]>((resolve, reject) => {
    referenceManyCall({
      ids,
      resource,
      queryFilters,
      resolve,
      reject,
    });
  }),
  enabled,
  ...props
});

export default useGetReferenceMany;

type GetManyParameters = {
  ids: string[],
  resource: string,
  queryFilters?: Record<string, string | number | undefined>,
  resolve: (value: unknown[] | PromiseLike<unknown[]>) => void,
  reject: (value: unknown[] | PromiseLike<unknown[]>) => void,
}

// This function takes all hook calls (useGetReferenceMany)
// on single screen and batches them together in one array

const batchParams = (fn : (listOfManyParams: GetManyParameters[]) => void) => {
  let capturedArgs: GetManyParameters[] = [];
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (arg: GetManyParameters) => {
    capturedArgs.push(arg);
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      fn([...capturedArgs]);
      capturedArgs = [];
    }, 0);
  };
};

const referenceManyCall = batchParams((listOfManyParams: GetManyParameters[]) => {
    const token = typeof window !== 'undefined' && localStorage.getItem("token");
  const aggregatedParams: Record<string, GetManyParameters[] > = {};
  // Set resource name as key for aggregatedParams
  for (const param of listOfManyParams) {
    aggregatedParams[param.resource] ??= [];
    // fill map with id values for further itterations

    aggregatedParams[param.resource].push(param);
  }

  for (const resource in aggregatedParams) {
    // create search params from given object key
    const searchParams = new URLSearchParams();
    const uniqueIdsSet = new Set();
    // Get rid of all duplicate ids
    for (const param of aggregatedParams[resource]) {
      if (param.queryFilters) {
        Object.keys(param.queryFilters)
          .map((key) => searchParams.append(key, `${param.queryFilters![key]}`));
      }
      for (const id of param.ids) {
        uniqueIdsSet.add(id);
      }
    }

    uniqueIdsSet.forEach((id) => {
      if (id) searchParams.append('id', id as string);
    });

    axios.get(`/${resource}?${searchParams.toString()}`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, },
    })
      .then((response) => {
        const responseMap = new Map();

        for (const obj of response.data?.results) {
          responseMap.set(obj.id, obj);
        }

        // returns data for each request
        for (const param of aggregatedParams[resource]) {
          const dataPerRequest = [];

          for (const id of param.ids) {
            const aaa = responseMap.get(id);
            dataPerRequest.push(aaa);
          }
          param.resolve(dataPerRequest);
        }
      }).catch((error:unknown[] | PromiseLike<unknown[]>) => {
        for (const param of aggregatedParams[resource]) {
          param.reject(error);
        }
      });
  }
});
