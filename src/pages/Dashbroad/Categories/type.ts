import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface DataCategory {
  image?: File[];
  name: string;
  price_type: string;
}

export interface DeleteCategory<T> {
  id: T;
  loading: boolean;
}

export interface CategoriesProps {
  id: string;
  name: string;
  image: string;
  price_type: string;
  created_at: string;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof CategoriesProps;
  label: string;
  numeric: boolean;
}

export interface InputImageProps {
  image: string | null;
  data: DataCategory;
  errors: FieldErrors<DataCategory>;
  register: UseFormRegister<DataCategory>;
  handleChangeImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface InputTextProps {
  errors: FieldErrors<DataCategory>;
  register: UseFormRegister<DataCategory>;
}

export type Order = "asc" | "desc";

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof CategoriesProps
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  selected: string[];
  headCells: HeadCell[];
  handleOpenModal: () => void;
}

export interface GenericData {
  id: string;
}

export interface DeleteCategoryHandleProps {
  openModal: () => void;
}
