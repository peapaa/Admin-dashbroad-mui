import axiosInstance from "../axios";

export const getAllCategories = async () => {
  try {
    const response = await axiosInstance.get(`/api/cms/material_categories`);

    return response;
  } catch (err) {
    console.error("login fail", err);
    throw err;
  }
};
