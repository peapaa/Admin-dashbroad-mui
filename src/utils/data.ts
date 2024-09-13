import { HeadCell } from "@/pages/Dashbroad/Categories/type";

// dashboard list
export const dashboardList = [{ href: "dashbroad/main", title: "Main" }];
// resources list
export const resourcesList = [
  { href: "resources/tags", title: "Tags" },
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

export interface priceTypesProps {
  value: string;
  option: string;
}
export const price_types: priceTypesProps[] = [
  {
    value: "per_metter",
    option: "Metter",
  },
  {
    value: "per_quantity",
    option: "Quantity",
  },
];
