import axiosInstance from "../axios";

export const getAllCategories = async (searchText: string, page: number) => {
  try {
    const limit = 5;
    const offset = page * limit;
    const response = await axiosInstance.get("/api/cms/material_categories", {
      params: { limit, name: searchText, offset: offset },
    });
    return response;
  } catch (err) {
    throw err;
  }
};
