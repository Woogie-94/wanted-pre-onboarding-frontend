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

export interface TodoEditPayload {
  id: number;
  todo: string;
  isCompleted: boolean;
}
export const editTodo = async (payload: TodoEditPayload) => {
  const { id, todo, isCompleted } = payload;
  const { data } = await httpService.put(`/todos/${id}`, { todo, isCompleted });
  return data;
};
