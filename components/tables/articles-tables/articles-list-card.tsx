import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Article, ListResponse } from "@/types";

import { Dot } from "lucide-react";
import React from "react";
import { CellAction } from "./cell-action";
import { PaginationProps } from "@/components/ui/data-table";
import { useRouter } from "next/navigation";
import PaginationControlled from "@/components/pagination-controlled";

type Props = {
  data: ListResponse<Article> | undefined;
  pagination?: PaginationProps;
  setPagination?: any;
};

const ArticleListCard = ({ data, pagination, setPagination }: Props) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4">
      {data?.results?.map((article) => (
        <Card
          onClick={() =>
            router.push(`/dashboard/articles/details/${article.id}`)
          }
          className={cn(
            "shadow-md hover:shadow-xl transition-all hover:scale-[101%] cursor-pointer"
          )}
        >
          <CardHeader className="relative flex flex-row border-b-2 border-secondary p-3 text-md font-bold w-full justify-between items-center">
            <p>{article.name}</p>
            <CellAction data={article} />
          </CardHeader>
          <CardContent className="whitespace-pre-wrap p-3 text-left gap-2 flex flex-col">
            <p className="flex gap-1">
              <Dot />
              {article.count + " " + article.unit}
            </p>
          </CardContent>
        </Card>
      ))}
      <PaginationControlled
        data={data}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
};

export default ArticleListCard;
