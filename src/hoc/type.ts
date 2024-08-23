import { CategoriesProps } from "@/pages/Dashbroad/Categories/type";

export interface WithCategoriesProps {
  categories: CategoriesProps[];
  loading: boolean;
  errors: string;
}
