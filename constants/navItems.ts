import { NavItem } from "@/types";

export const navItems: NavItem[] = [
  // {
  //   title: 'Kontrolna ploča',
  //   href: '/dashboard',
  //   icon: 'dashboard',
  //   label: 'kontrolnaPloča'
  // },
  {
    title: "Zadatci",
    href: "/dashboard/tasks",
    key: "tasks",
    icon: "tasks",
    label: "kanban",
  },
  {
    title: "Skladište",
    href: "/dashboard/articles",
    key: "articles",
    icon: "package",
    label: "articles",
  },
  {
    title: "Skladište po djelatniku",
    href: "/dashboard/driver-inventory",
    key: "driver-inventory",
    icon: "packageOpen",
    label: "driver-inventory",
  },
  {
    title: "Lokacije",
    key: "locations",
    href: "/dashboard/locations",
    icon: "location",
    label: "employee",
  },
  // {
  //   title: 'Profile',
  //   href: '/dashboard/profile',
  //   icon: 'profile',
  //   label: 'profile'
  // },
  {
    title: "Odjava",
    key: "signout",
    href: "/",
    icon: "login",
    label: "login",
  },
];
