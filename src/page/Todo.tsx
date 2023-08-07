import { AxiosError, isAxiosError } from "axios";
import { useEffect } from "react";

import TodoItem from "../component/todo/TodoItem";
import useTodoFetch from "../fetch/useTodoFetch";
import usePageAccess from "../hook/usePageAccess";

const Todo = () => {
  const { data: todos, error } = useTodoFetch();

  useEffect(() => {
    if (isAxiosError(error)) {
      const ex: AxiosError<{ error: string; message: string; status: number }> = error;
      if (ex.response?.data.message) {
        alert(ex.response.data.message);
      }
    }
  }, [error]);

  usePageAccess();

  return (
    <>
      <ul>{todos?.map(todo => <TodoItem key={todo.id} todo={todo} />)}</ul>
    </>
  );
};

export default Todo;
