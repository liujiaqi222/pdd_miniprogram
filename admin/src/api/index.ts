import axios from "axios";

const service = axios.create({});

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = (user: { name: string; password: string }) => {
  return service.post("/api/v1/auth/login", user);
};

export const changeGroupUrl = (url: string) => {
  return service.post("/api/v1/config/changeGroupUrl", { groupUrl: url });
};
export const getGroupUrl = () => {
  return service.get("/api/v1/config/getGroupUrl");
};
