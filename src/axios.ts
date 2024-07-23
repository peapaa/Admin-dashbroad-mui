import axios from "axios";
import { refreshAccessToken } from "./services/authService";

const API_URL = "http://192.168.200.189:8001/api";

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

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;

    if (error.response && error.response.status === 401) {
      try {
        const tokenString = localStorage.getItem("token");
        const token = tokenString ? JSON.parse(tokenString) : null;

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
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalConfig = error.config;
//     console.log("Access token expired");
//     if (error.response && error.response.status === 401) {
//       try {
//         console.log("call request token api");
//         const tokenString = JSON.parse(localStorage.getItem("token"));
//         const token = tokenString ? JSON.parse(tokenString) : null;
//         if (token && token.refresh) {
//           const result = await refreshAccessToken(token?.refresh);
//           if (result?.status === 200) {
//             localStorage.setItem(
//               "token",
//               JSON.stringify({
//                 ...token,
//                 access: result?.data?.access,
//                 refresh: result?.data?.refresh,
//               })
//             );
//             originalConfig.headers[
//               "Authorization"
//             ] = `Bearer ${result?.data?.access}`;
//           }
//           return axiosInstance(originalConfig);
//         }
//       } catch (error) {}
//     }
//   }
// );
// export default axiosInstance;
