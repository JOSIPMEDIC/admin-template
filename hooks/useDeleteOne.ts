/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation } from "@tanstack/react-query";

type Props = {
  resource: string;
};

type Vratiables = {
  id: string;
};

const useDeleteOne = <T>({ resource }: Props) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const deleteOne = ({ id }: Vratiables): Promise<T> => {
    return fetch(process.env.NEXT_PUBLIC_API_BASE_URL + resource + "/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    }).then((response) => response.json());
  };
  return useMutation({
    mutationFn: deleteOne,
  });
};

export default useDeleteOne;
