"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./button";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { ListResponse } from "@/types";
import { useMemo } from "react";
import PaginationControlled from "../pagination-controlled";

export type PaginationProps = {
  offset: number;
  limit: number;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: ListResponse<TData> | undefined;
  loading?: boolean;
  pagination?: PaginationProps;
  setPagination?: any;
  onDoubleClickLink?: (data: TData) => string;
}

export const getArrayOfPages = (pageData: ListResponse<any>, limit: number) => {
  return Array(Math.ceil(pageData.count / limit))
    .fill(0)
    .map((_, i) => i * limit);
};

export function DataTable<TData, TValue>({
  columns,
  data,
  loading,
  pagination,
  setPagination,
  onDoubleClickLink,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();

  const memoizedData = useMemo(() => {
    if (!data) return [];
    return data.results;
  }, [data]);

  const table = useReactTable({
    data: memoizedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <ScrollArea className="h-[calc(80vh-220px)] rounded-md border-2 border-muted/60 md:h-[calc(80dvh-200px)]">
        <Table className="relative">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="bg-muted/40" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="font-semibold text-base"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {data?.results?.length && table?.getRowModel()?.rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onDoubleClick={(e) => {
                    if (onDoubleClickLink) {
                      e.stopPropagation();
                      router.push(
                        // `/dashboard/articles/details/${(row?.original as any)?.id}`
                        onDoubleClickLink(row?.original)
                      );
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="min-h-full h-96 text-center"
                >
                  {loading ? (
                    <p className="w-full flex justify-center">
                      <Loader className="animate-spin w-10 h-10" />
                    </p>
                  ) : (
                    "Nema rezultata"
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <PaginationControlled
        data={data}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
}
