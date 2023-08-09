import FETCH_KEY from "./fetchKeys";
import { fetchClient } from "../App";
import useSend from "../hook/useSend";
import { Todo } from "../interface/todo";
import { deleteTodo } from "../services/todo";

const useDeleteTodoSend = () => {
  return useSend(deleteTodo, {
    onSuccess: (_, id) => {
      const prevData = fetchClient.getFetchData<Todo[]>(FETCH_KEY.todoList);
      if (prevData) {
        fetchClient.setFetchData(
          FETCH_KEY.todoList,
          prevData.data.filter(item => item.id !== id),
        );
      }
    },
  });
};

export default useDeleteTodoSend;
