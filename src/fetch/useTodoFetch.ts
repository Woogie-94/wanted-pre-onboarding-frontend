import FETCH_KEY from "./fetchKeys";
import useFetch from "../hook/useFetch";
import { Todo } from "../interface/todo";
import { getTodos } from "../services/todo";

const useTodoFetch = () => {
  return useFetch<Todo[]>(FETCH_KEY.todoList, getTodos);
};

export default useTodoFetch;
