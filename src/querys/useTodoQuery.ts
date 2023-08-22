import QUERY_KEY from "./queryKeys";
import useQuery from "../hook/useQuery";
import { Todo } from "../interface/todo";
import { getTodos } from "../services/todo";

const useTodoQuery = () => {
  return useQuery<Todo[]>(QUERY_KEY.todoList, getTodos);
};

export default useTodoQuery;
