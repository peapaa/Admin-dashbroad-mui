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

export const createMaterialCategory = async (formData: FormData) => {
  const response = await axiosInstance.post("/api/cms/material", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const getOneMaterial = async (id: string) => {
  const response = await axiosInstance.get(`/api/cms/material/${id}`);
  return response;
};

export const updateMaterial = async (formData: FormData, id: string) => {
  const response = await axiosInstance.put(
    `/api/cms/material/${id}`,
    formData,
    { headers: { "Content-Type": " multipart/form-data" } }
  );
  return response;
};

export const deleteOneMaterial = async (id: string) => {
  const response = await axiosInstance.delete(`/api/cms/material/${id}`);
  return response;
};

export const deleteSelectedMutilpleMaterials = async (id: string[]) => {
  const response = await axiosInstance.delete(`/api/cms/material/bulk/${id}`);
  return response;
};
