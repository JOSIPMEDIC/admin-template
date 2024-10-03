import useGetData from "@/hooks/useGetData";
import { Article, ListResponse } from "@/types";
import React from "react";

type Props = {
  activeItem: string | undefined;
};

const UnitAdornment = ({ activeItem }: Props) => {
  const { data: itemsResponse, isLoading: itemsLoad } = useGetData<
    ListResponse<Article>
  >({
    resource: `items?limit=1000`,
  });
  const item = itemsResponse?.results?.find((item) => item.id === activeItem);
  return <div className="font-semibold italic">{item?.unit ?? "-"}</div>;
};

export default UnitAdornment;
