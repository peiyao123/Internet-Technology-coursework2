import axios from "axios";

const baseURL = 'http://127.0.0.1:3000'

const service = axios.create({
  baseURL,
  timeout: 5000,
});

//axios拦截器
service.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      config.headers.Authorization = window.localStorage.getItem("token");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
