import httpService from "./httpService";

export const getTodos = async () => {
  const { data } = await httpService.get("/todos");
  return data;
};

export interface TodoFrom {
  todo: string;
}

export const addTodo = async (payload: TodoFrom) => {
  const { data } = await httpService.post("/todos", payload);
  return data;
};
