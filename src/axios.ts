import axios from "axios";
import { refreshAccessToken } from "./services/authService";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://192.168.200.189:8001";

// Tạo một instance của axios
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const tokenString = localStorage.getItem("token");
    if (tokenString) {
      try {
        const token = JSON.parse(tokenString);
        if (token && token.access) {
          config.headers["Authorization"] = `Bearer ${token.access}`;
        }
      } catch (err) {
        console.error("Failed to parse token:", err);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface jwtPayload {
  exp: number;
}
const isTokenExpired = (token: string) => {
  if (!token) return true;
  const { exp } = jwtDecode<jwtPayload>(token);
  return Date.now() >= exp * 1000;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;

    if (error.response && error.response.status === 401) {
      try {
        const tokenString = localStorage.getItem("token");
        const token = tokenString ? JSON.parse(tokenString) : null;
        if (!token || !token.refresh || isTokenExpired(token.refresh)) {
          // check refresh token con han khong
          localStorage.removeItem("token");
          window.location.href = "/login";
          return Promise.reject(error);
        }
        if (token && token.refresh) {
          const result = await refreshAccessToken(token.refresh);
          if (result?.status === 200) {
            localStorage.setItem(
              "token",
              JSON.stringify({
                ...token,
                access: result.data.access,
                refresh: result.data.refresh,
              })
            );

            originalConfig.headers[
              "Authorization"
            ] = `Bearer ${result.data.access}`;

            return axiosInstance(originalConfig);
          }
        }
      } catch (err) {
        console.error("Failed to refresh access token:", err);
        localStorage.removeItem("token");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return error.response;
  }
);

export default axiosInstance;
