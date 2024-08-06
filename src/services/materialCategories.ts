import axiosInstance from "../axios";

// export const getAllCategories = async (searchText: string, page: number) => {
//   const limit = 5;
//   const offset = page * limit;
//   const response = await axiosInstance.get("/api/cms/material_categories", {
//     params: { limit, name: searchText, offset: offset },
//   });
//   return response;
// };

export const getAllCategories = async (
  url: string,
  searchText: string,
  page: number
) => {
  const limit = 5;
  const offset = page * limit;
  const response = await axiosInstance.get(url, {
    params: { limit, name: searchText, offset: offset },
  });
  return response.data;
};

export const createCategories = async (formData: FormData) => {
  const response = await axiosInstance.post(
    "/api/cms/material_categories",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const deleteOneCategories = async (id: string) => {
  const response = await axiosInstance.delete(
    `/api/cms/material_categories/${id}`
  );
  return response;
};

export const getOneCategory = async (id: string) => {
  const response = await axiosInstance.get(
    `/api/cms/material_categories/${id}`
  );
  return response;
};

export const editCategory = async (formData: FormData, id: string) => {
  const response = await axiosInstance.put(
    `/api/cms/material_categories/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};
