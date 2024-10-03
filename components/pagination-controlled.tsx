import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { getArrayOfPages, PaginationProps } from "./ui/data-table";
import { ListResponse } from "@/types";

type Props = {
  data: ListResponse<any> | undefined;
  pagination?: PaginationProps;
  setPagination?: any;
};

const PaginationControlled = ({ data, pagination, setPagination }: Props) => {
  return pagination && data?.count && data?.count > 10 ? (
    <div className="w-full pt-2 flex flex-row items-center justify-between">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={!data?.previous}
              onClick={() =>
                !!data?.previous &&
                setPagination(pagination?.offset - pagination?.limit)
              }
            />
          </PaginationItem>
          {getArrayOfPages(data, pagination?.limit).map((number, index) => (
            <PaginationItem>
              <PaginationLink
                isActive={pagination?.offset === number}
                onClick={() => setPagination(number)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              disabled={!data?.next}
              onClick={() =>
                !!data?.next &&
                setPagination(pagination?.offset + pagination?.limit)
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  ) : null;
};

export default PaginationControlled;
