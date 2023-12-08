import axios from "axios";

const service = axios.create({
  baseURL: "http://127.0.0.1:3000",
  timeout: 5000,
});

//axios拦截器
service.interceptors.request.use(
  (config) => {
    if (sessionStorage.getItem("token")) {
      config.headers.Authorization = window.sessionStorage.getItem("token");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
