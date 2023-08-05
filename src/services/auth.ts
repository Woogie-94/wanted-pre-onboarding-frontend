import httpService from "./httpService";

export interface SignupForm {
  email: string;
  password: string;
}

export const sendSignup = async (params: SignupForm) => {
  const { data } = await httpService.post("/auth/signup", params);
  return data;
};

export interface SigninForm {
  email: string;
  password: string;
}
export const sendSignin = async (params: SigninForm) => {
  const { data } = await httpService.post("/auth/signin", params);
  return data;
};
