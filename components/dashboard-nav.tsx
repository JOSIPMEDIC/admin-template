"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { useSidebar } from "@/hooks/useSidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export function DashboardNav({
  items,
  setOpen,
  isMobileNav = false,
}: DashboardNavProps) {
  const path = usePathname();
  const { isMinimized } = useSidebar();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2 min-h-full">
      <TooltipProvider>
        {items.map((item, index) => {
          const Icon = Icons[item.icon || "arrowRight"];
          return (
            item.href && (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.disabled ? "/" : item.href}
                    className={cn(
                      "flex items-center gap-2 overflow-hidden rounded-md py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      path.includes(item.key) ? "bg-accent" : "transparent",
                      item.disabled && "cursor-not-allowed opacity-80",
                      items.length - 1 === index && "text-primary"
                    )}
                    onClick={() => {
                      if (setOpen) setOpen(false);
                      if (
                        item.key === "signout" &&
                        typeof window !== "undefined"
                      ) {
                        localStorage.removeItem("token");
                      }
                    }}
                  >
                    <Icon className={`ml-3 size-6 flex-none`} />
                    {isMobileNav || (!isMinimized && !isMobileNav) ? (
                      <span className="mr-2 truncate ">{item.title}</span>
                    ) : (
                      ""
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  sideOffset={8}
                  className={!isMinimized ? "hidden" : "inline-block"}
                >
                  {item.title}
                </TooltipContent>
              </Tooltip>
            )
          );
        })}
      </TooltipProvider>
    </nav>
  );
}
