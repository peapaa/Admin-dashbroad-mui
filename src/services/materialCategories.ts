import axiosInstance from "../axios";

// call api useEffect

// export const getAllCategories = async (searchText: string, page: number) => {
//   const limit = 5;
//   const offset = page * limit;
//   const response = await axiosInstance.get("/api/cms/material_categories", {
//     params: { limit, name: searchText, offset: offset },
//   });
//   return response;
// };

// call with useSWR form basic ==> key was changed --> don't use

// export const getAllCategories = async (
//   url: string,
//   searchText: string,
//   page: number
// ) => {
//   const limit = 5;
//   const offset = (page - 1) * limit;
//   const response = await axiosInstance.get(url, {
//     params: { limit, name: searchText, offset: offset },
//   });
//   return response.data;
// };

// useSWR --> oke
export const getAllCategories = async (url: string) => {
  const response = await axiosInstance.get(url);
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
