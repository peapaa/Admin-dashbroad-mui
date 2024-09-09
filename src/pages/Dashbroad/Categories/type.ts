import { priceTypesProps } from "@/utils/data";
import { UseFormReturn } from "react-hook-form";

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
  price_type?: string;
  created_at?: string;
  part_number?: string;
  type?: string;
  large_title?: string;
  category?: string;
  small_title?: string;
  basic_price?: string;
  supplier_name?: string;
}

export interface HeadCell {
  id: keyof CategoriesProps;
  label: string;
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
  placeholder?: string;
  typeInput?: string;
}

export interface SelectOptionProps {
  value: string;
  onChange: (value: string) => void;
  error?: string | undefined;
  optionValues: priceTypesProps[];
  id: string;
}

export interface EnhancedTableProps {
  headCells: HeadCell[];
}

export interface GenericData {
  id: string;
}

export interface DeleteHandleProps {
  openModal: () => void;
}

export interface FormActionProps {
  onSubmit: (data: DataCategory) => Promise<void>;
  formMethod: UseFormReturn<DataCategory, unknown, undefined>;
  newImage: string | null;
  loading: boolean;
}

export interface FormValuesMaterial {
  searchText: string;
  searchCategory: string;
}

export interface InputSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export interface FormValuesCategory {
  searchText: string;
}
