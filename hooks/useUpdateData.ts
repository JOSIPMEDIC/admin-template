/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { getCookie } from "@/lib/cookies";
import { useMutation } from "@tanstack/react-query";

type Props = {
  resource: string;
};

type Vratiables = {
  data: unknown;
  id: string;
  suffix?: string;
};

const useUpdateData = <T>({ resource }: Props) => {
  const update = ({ data, id, suffix }: Vratiables): Promise<T> => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    return fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        resource +
        "/" +
        id +
        (suffix ? "/" + suffix : ""),
      {
        body: JSON.stringify(data),
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => response.json());
  };
  return useMutation({
    mutationFn: update,
  });
};

export default useUpdateData;
