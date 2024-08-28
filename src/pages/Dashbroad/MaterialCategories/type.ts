import { WithCategoriesProps, withSupplierProps } from "@/hoc/type";
import { priceTypesProps } from "@/utils/data";
import { Control, FieldErrors, UseFormReturn } from "react-hook-form";

export interface GetAllMarterialCategoriesProps {
  basic_price: number;
  category: {
    name: string;
  };
  id: string;
  image: string;
  large_title: string;
  name: string;
  part_number: string;
  small_title: string;
  supplier: {
    name: string;
  };
  type: number;
}

export interface MarterialCategoriesProps {
  image: File[];
  part_number: string;
  name?: string;
  type?: number;
  large_title: string;
  small_title: string;
  basic_price: number;
  category: string;
  supplier: string;
}

export interface ControllerFormProps {
  control: Control<MarterialCategoriesProps, unknown>;
  errors: FieldErrors<MarterialCategoriesProps>;
  name: string;
  title: string;
  typeInput?: string;
  OptionValues?: priceTypesProps[];
}

export interface ControllerFormSelectWithCategoriesProps
  extends WithCategoriesProps {
  control: Control<MarterialCategoriesProps, unknown>;
  errorForm: FieldErrors<MarterialCategoriesProps>;
}

export interface ControllerFormSelectWithSupplierProps
  extends withSupplierProps {
  control: Control<MarterialCategoriesProps, unknown>;
  errorForm: FieldErrors<MarterialCategoriesProps>;
}

export interface FormActionMateriaProps {
  onSubmit: (data: MarterialCategoriesProps) => Promise<void>;
  formMethod: UseFormReturn<MarterialCategoriesProps, unknown, undefined>;
  newImage: string | null;
  loading: boolean;
}
