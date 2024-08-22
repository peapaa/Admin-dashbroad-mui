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
  { href: "resources/material-categories", title: "Material Categories" },
];

// headCell category
export const headCellCategory: HeadCell[] = [
  { id: "id", label: "ID" },
  { id: "image", label: "Avatar" },
  { id: "name", label: "Name" },
  {
    id: "price_type",
    label: "Price type",
  },
];

export const headCellMaterialCategory: HeadCell[] = [
  { id: "id", label: "ID" },
  { id: "image", label: "Image" },
  { id: "name", label: "Name" },
  {
    id: "part_number",
    label: "Part number",
  },
  {
    id: "type",
    label: "Type",
  },
  {
    id: "category",
    label: "Category",
  },
  {
    id: "large_title",
    label: "Large_title",
  },
  {
    id: "small_title",
    label: "Small title",
  },
  {
    id: "basic_price",
    label: "Basic Price",
  },
  {
    id: "supplier_name",
    label: "Supplier Name",
  },
];
