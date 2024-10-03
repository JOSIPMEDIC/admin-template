"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import useDeleteOne from "@/hooks/useDeleteOne";
import useRefresh from "@/hooks/useRefresh";
import { Article } from "@/types";
import { Eye, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

interface CellActionProps {
  data: Article;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [openDropdown, setOpenDropdown] = useState(false);
  const refresh = useRefresh();
  const { mutate, isPending } = useDeleteOne({
    resource: "items",
  });

  const onConfirm = async () => {
    mutate(
      { id: data.id },
      {
        onSettled: () => {
          refresh();
          setOpen(false);
          toast({
            title: "Artikl obrisan",
            variant: "success",
          });
        },
      }
    );
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={isPending}
        title="Brisanje artikla?"
        paragraph="Jeste li sigurni da zelite izbrisati artikl?"
      />
      <DropdownMenu
        modal={false}
        open={openDropdown}
        onOpenChange={setOpenDropdown}
      >
        <DropdownMenuTrigger
          asChild
          onClick={(e) => {
            e.stopPropagation();
            setOpenDropdown(openDropdown);
          }}
        >
          <Button variant="outline" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Akcije</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Eye className="mr-2 h-4 w-4" /> Detalji
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
