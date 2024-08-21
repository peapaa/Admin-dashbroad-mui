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
  value: File[] | undefined;
  error: string | undefined;
  onChange: (value: File[] | undefined) => void;
  imageUrl?: string | null;
}

export interface InputTextProps {
  value: string;
  onChange: (value: string) => void;
  error?: string | undefined;
}

export interface SelectOptionProps {
  value: string;
  onChange: (value: string) => void;
  error?: string | undefined;
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
