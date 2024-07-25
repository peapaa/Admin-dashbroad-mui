import axiosInstance from "../axios";

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/api/cms/auth/login", {
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

    return response;
  } catch (err) {
    console.error("refresh token fail", err);
  }
};
