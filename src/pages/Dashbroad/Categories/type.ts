import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface DataCategory {
  image?: File[];
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
