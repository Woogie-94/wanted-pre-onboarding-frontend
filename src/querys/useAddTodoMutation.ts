import QUERY_KEY from "./queryKeys";
import { queryClient } from "../App";
import useMutation from "../hook/useMutation";
import { Todo } from "../interface/todo";
import { addTodo } from "../services/todo";

const useAddTodoMutation = () => {
  return useMutation(addTodo, {
    onSuccess: data => {
      const prevData = queryClient.getQueryData<Todo[]>(QUERY_KEY.todoList);
      if (prevData) {
        queryClient.setQueryData(QUERY_KEY.todoList, [...prevData.data, data]);
      }
    },
  });
};

export default useAddTodoMutation;
