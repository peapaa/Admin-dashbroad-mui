import { DataCategory } from "./type";

export default function formDataCategory(data: DataCategory) {
  const formData = new FormData();
  if (data.image && data.image.length > 0) {
    formData.append("image", data.image[0]);
  }
  formData.append("name", data.name);
  formData.append("price_type", data.price_type);
  return formData;
}
