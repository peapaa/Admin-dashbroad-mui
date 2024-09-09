import { FormValuesMaterial } from "@/pages/Dashbroad/Categories/type";
import { UseFormReset } from "react-hook-form";

export interface ButtonFormProps {
  loading: boolean;
}

export interface SelectCheckAllTableProps {
  numSelected: number;
  rowCount: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selected: string[];
  handleOpenModal: () => void;
}

export interface ButtonClearSearchProps {
  reset: UseFormReset<FormValuesMaterial>;
}

export interface LoadingProps {
  className?: string;
}

export interface ButtonRetryProps {
  className?: string;
  onClick: () => void;
}
