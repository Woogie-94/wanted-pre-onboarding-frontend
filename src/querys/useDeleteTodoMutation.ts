import QUERY_KEY from "./queryKeys";
import { queryClient } from "../App";
import useMutation from "../hook/useMutation";
import { Todo } from "../interface/todo";
import { deleteTodo } from "../services/todo";

const useDeleteTodoMutation = () => {
  return useMutation(deleteTodo, {
    onSuccess: (_, id) => {
      const prevData = queryClient.getQueryData<Todo[]>(QUERY_KEY.todoList);
      if (prevData) {
        queryClient.setQueryData(
          QUERY_KEY.todoList,
          prevData.data.filter(item => item.id !== id),
        );
      }
    },
  });
};

export default useDeleteTodoMutation;
