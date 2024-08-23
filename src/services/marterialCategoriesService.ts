import axiosInstance from "@/axios";

export const getAllCategoriesForMaterial = async () => {
  const response = await axiosInstance.get("/api/cms/material_categories");
  return response;
};

export const getAllMarterialCategories = async (
  searchText: string,
  searchCategory: string,
  page: number
) => {
  const limit = 5;
  const offset = limit * (page - 1);
  const response = await axiosInstance.get("/api/cms/material", {
    params: {
      name: searchText,
      category: searchCategory,
      offset: offset,
      limit: limit,
    },
  });
  return response;
};
