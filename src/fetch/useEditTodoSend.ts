import FETCH_KEY from "./fetchKeys";
import { fetchClient } from "../App";
import useSend from "../hook/useSend";
import { Todo } from "../interface/todo";
import { editTodo } from "../services/todo";

const useEditTodoSend = () => {
  return useSend(editTodo, {
    onSuccess: (data: Todo) => {
      const prevData = fetchClient.getFetchData<Todo[]>(FETCH_KEY.todoList);
      if (prevData) {
        fetchClient.setFetchData(
          FETCH_KEY.todoList,
          prevData.data.map(item => {
            if (item.id === data.id) {
              return { ...item, isCompleted: data.isCompleted };
            }
            return item;
          }),
        );
      }
    },
  });
};

export default useEditTodoSend;
