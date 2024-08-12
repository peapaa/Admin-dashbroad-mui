export interface DataCategory {
  image: File[];
  name: string;
  price_type: string;
}

export interface DeleteCategory {
  id: string;
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
