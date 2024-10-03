"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Props = {
  resource: string;
  key?: string;
  enabled?: boolean;
};

const useGetData = <T>({ resource, key, enabled = true }: Props) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const router = useRouter();

  return useQuery<T>({
    queryKey: [resource, key],
    queryFn: async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL + resource,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(response.status === 401){
        localStorage.removeItem("token");
        router.push("/");
      }
      return (await response.json()) as T;
    },
    enabled,
  });
};

export default useGetData;
