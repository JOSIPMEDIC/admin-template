"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Article } from "@/types";
import { format } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const columns: ColumnDef<Article>[] = [
  {
    accessorKey: "name",
    header: "Naziv",
  },
  {
    accessorKey: "count",
    header: "Količina",
  },
  {
    accessorKey: "unit",
    header: "Mjerna jedinica",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

export const columnsDetails: ColumnDef<Storage>[] = [
  {
    accessorKey: "user.username",
    header: "Korisnik",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {row.original.user?.first_name[0]?.toUpperCase() +
                row.original.user?.last_name[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {row.original.user.username}
        </div>
      );
    },
  },
  {
    accessorKey: "item.name",
    header: "Naziv",
  },
  {
    accessorKey: "quantity",
    header: "Količina",
    cell: ({ row }) => {
      const quantity = row.original.quantity;
      const unit = row.original.item.unit;
      return `${quantity} ${unit}`;
    },
  },
  {
    accessorKey: "created",
    header: "Vrijeme",
    cell({ row }) {
      return row.original.created
        ? format(new Date(row.original.created), "dd.MM.yyyy. HH:mm")
        : "---";
    },
  },
];
