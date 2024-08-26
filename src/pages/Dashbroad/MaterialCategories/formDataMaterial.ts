import { MarterialCategoriesProps } from "@/pages/Dashbroad/MaterialCategories/type";

const formDataMaterial = (data: MarterialCategoriesProps) => {
  const formData = new FormData();
  if (data.image && data.image.length > 0) {
    formData.append("image", data.image[0]);
  }
  formData.append("part_number", data.part_number);
  if (data.name) {
    formData.append("name", data.name);
  }
  if (data.type) {
    formData.append("type", data.type.toString());
  }
  formData.append("large_title", data.large_title);
  formData.append("small_title", data.small_title);
  formData.append("basic_price", data.basic_price.toString());
  formData.append("category", data.category);
  formData.append("supplier", data.supplier);

  return formData;
};

export default formDataMaterial;
