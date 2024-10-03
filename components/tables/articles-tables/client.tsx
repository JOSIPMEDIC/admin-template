"use client";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns } from "./columns";
import useGetData from "@/hooks/useGetData";
import { Article, ListResponse } from "@/types";
import { useState } from "react";
import ArticleListCard from "./articles-list-card";
import React from "react";

export const ArticleClient = () => {
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const { data, isLoading } = useGetData<ListResponse<Article>>({
    resource: `items?limit=${limit}&offset=${offset}`,
  });

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Skladište (${data?.count ?? "0"})`}
          description="Upravljajte svojim artiklima"
        />
      </div>
      <Separator />
      <div className="md:block hidden w-full">
        <DataTable
          columns={columns}
          data={data}
          loading={isLoading}
          pagination={{ offset: offset, limit: limit }}
          setPagination={setOffset}
        />
      </div>
      <div className="md:hidden">
        <ArticleListCard
          data={data}
          pagination={{ offset: offset, limit: limit }}
          setPagination={setOffset}
        />
      </div>
    </>
  );
};
