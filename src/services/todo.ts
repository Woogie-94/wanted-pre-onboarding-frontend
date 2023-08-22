import httpService from "./httpService";

export const getTodos = async () => {
  const { data } = await httpService.get("/todos");
  return data;
};

export interface TodoFrom {
  todo: string;
}

export const addTodo = async (todo: string) => {
  const { data } = await httpService.post("/todos", { todo });
  return data;
};

export interface TodoEditParams {
  id: number;
  todo: string;
  isCompleted: boolean;
}
export const editTodo = async (params: TodoEditParams) => {
  const { id, todo, isCompleted } = params;
  const { data } = await httpService.put(`/todos/${id}`, { todo, isCompleted });
  return data;
};

export const deleteTodo = async (id: number) => {
  const { data } = await httpService.delete(`/todos/${id}`);
  return data;
};
