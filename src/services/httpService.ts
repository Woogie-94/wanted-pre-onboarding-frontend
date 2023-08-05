import axios from "axios";

const httpService = axios.create();
httpService.defaults.baseURL = "https://www.pre-onboarding-selection-task.shop";

httpService.interceptors.request.use(config => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

httpService.interceptors.response.use(response => {
  if (response.data.access_token) {
    localStorage.setItem("accessToken", response.data.access_token);
  }

  return response;
});

export default httpService;
