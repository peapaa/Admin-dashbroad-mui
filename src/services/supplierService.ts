import axiosInstance from "@/axios";

export const getSupplier = async () => {
  const response = await axiosInstance.get("/api/cms/supplier");
  return response;
};
