import FETCH_KEY from "./fetchKeys";
import { fetchClient } from "../App";
import useSend from "../hook/useSend";
import { Todo } from "../interface/todo";
import { addTodo } from "../services/todo";

const useAddTodoSend = () => {
  return useSend(addTodo, {
    onSuccess: data => {
      const prevData = fetchClient.getFetchData<Todo[]>(FETCH_KEY.todoList);
      if (prevData) {
        fetchClient.setFetchData(FETCH_KEY.todoList, [...prevData.data, data]);
      }
    },
  });
};

export default useAddTodoSend;
