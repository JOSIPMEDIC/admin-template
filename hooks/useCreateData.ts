/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation } from "@tanstack/react-query";
import env from "../env";
type Props = {
  resource: string;
};

const useCreateData = <T>({ resource }: Props) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  return useMutation({
    mutationFn: async (data: T) => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL + resource,
        {
          credentials: "same-origin",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            ...(resource !== "auth/login" && {
              Authorization: `Bearer ${token}`,
            }),
          },
          method: "POST",
        },
      );
      return (await response.json()) as any;
    },
  });
};

export default useCreateData;
