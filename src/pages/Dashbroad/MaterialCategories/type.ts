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
  type?: string;
  large_title: string;
  small_title: string;
  basic_price: string;
  category: string;
  supplier: string;
}
