import useFetch from "../hook/useFetch";
import { Todo } from "../interface/todo";
import { getTodos } from "../services/todo";

const useTodoFetch = () => {
  return useFetch<Todo[]>("todoList", getTodos);
};

export default useTodoFetch;
