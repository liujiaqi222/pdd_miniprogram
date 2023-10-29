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

service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

type ResponseBase<T = string> = Promise<{
  success: boolean;
  message: string;
  data: T;
}>;

export const login = (user: {
  name: string;
  password: string;
}): ResponseBase<{ user: { name: string; role: string }; token: string }> => {
  return service.post("/api/v1/auth/login", user);
};

export const changeGroupUrl = (type: string, data: any): ResponseBase => {
  return service.post("/api/v1/config/changeGroupUrl", { type, data });
};

export type Config = {
  groupUrl: string;
  officialQrCodeURL: string;
  autoNewGroupURL: string;
  isOnReview: boolean;
};

export const getConfig = (): ResponseBase<Config> => {
  return service.get("/api/v1/config");
};
