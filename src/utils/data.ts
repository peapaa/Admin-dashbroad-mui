import { HeadCell } from "@/pages/Dashbroad/Categories/type";

// dashboard list
export const dashboardList = [
  { href: "dashbroad/main", title: "Main" },
  { href: "dashbroad/user-insights", title: "User Insights" },
];
// resources list
export const resourcesList = [
  { href: "resources/addresses", title: "Addresses" },
  { href: "resources/posts", title: "Posts" },
  { href: "resources/purchases", title: "Purchases" },
  { href: "resources/roles", title: "Roles" },
  { href: "resources/tags", title: "Tags" },
  { href: "resources/users", title: "Users" },
  { href: "resources/categories", title: "Categories" },
];

// headCell category
export const headCellCategory: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: false, label: "ID" },
  { id: "image", numeric: true, disablePadding: false, label: "Avatar" },
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  {
    id: "price_type",
    numeric: false,
    disablePadding: false,
    label: "Price type",
  },
];
