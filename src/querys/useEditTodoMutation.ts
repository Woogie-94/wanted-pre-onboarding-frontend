import QUERY_KEY from "./queryKeys";
import { queryClient } from "../App";
import useMutation from "../hooks/useMutation";
import { Todo } from "../interfaces/todo";
import { editTodo } from "../services/todo";

const useEditTodoMutation = () => {
  return useMutation(editTodo, {
    onSuccess: (data: Todo) => {
      const prevData = queryClient.getQueryData<Todo[]>(QUERY_KEY.todoList);
      if (prevData) {
        queryClient.setQueryData(
          QUERY_KEY.todoList,
          prevData.data.map(item => {
            if (item.id === data.id) {
              return { ...item, todo: data.todo, isCompleted: data.isCompleted };
            }
            return item;
          }),
        );
      }
    },
  });
};

export default useEditTodoMutation;
