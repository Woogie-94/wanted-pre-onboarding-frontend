import axios from "axios";

const httpService = axios.create();
httpService.defaults.baseURL = "https://www.pre-onboarding-selection-task.shop";

export default httpService;
