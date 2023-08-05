import httpService from "./httpService";

export interface SignupForm {
  email: string;
  password: string;
}
export const sendSignup = async (params: SignupForm) => {
  const { data } = await httpService.post("/auth/signup", params);
  return data;
};
