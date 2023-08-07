import httpService from "./httpService";

export const getTodos = async () => {
  const { data } = await httpService.get("/todos");
  return data;
};
