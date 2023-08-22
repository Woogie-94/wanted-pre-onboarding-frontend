import QUERY_KEY from "./queryKeys";
import useQuery from "../hooks/useQuery";
import { Todo } from "../interfaces/todo";
import { getTodos } from "../services/todo";

const useTodoQuery = () => {
  return useQuery<Todo[]>(QUERY_KEY.todoList, getTodos);
};

export default useTodoQuery;
