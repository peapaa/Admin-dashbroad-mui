import axiosInstance from "../axios";

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/cms/auth/login", {
      email,
      password,
    });

    return response;
  } catch (err) {
    console.error("login fail", err);
    throw err;
  }
};

export const refreshAccessToken = async (refresh: string) => {
  try {
    const response = await axiosInstance.post("/api/refresh-token", {
      refresh,
    });
    console.log("response.data", response.data);
    return response;
  } catch (err) {
    console.error("refresh token fail", err);
  }
};
