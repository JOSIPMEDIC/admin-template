import { Icons } from "@/components/icons";

export interface NavItem {
  title: string;
  href?: string;
  key: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export type ListResponse<T> = {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
};

export type Article = {
  id: string;
  name: string;
  count: number;
  unit: string;
  description: string;
};

export type User = {
  id:string
  username:string
  first_name:string
  last_name:string
}