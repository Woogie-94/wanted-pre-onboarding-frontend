import { useEffect } from "react";

import TodoItem from "../component/todo/TodoItem";
import useTodoFetch from "../fetch/useTodoFetch";
import useHttpError from "../hook/useHttpError";
import usePageAccess from "../hook/usePageAccess";

const Todo = () => {
  const { data: todos, error } = useTodoFetch();
  const { httpError, getHttpError } = useHttpError();

  useEffect(() => {
    getHttpError(error);
  }, [error, getHttpError]);

  usePageAccess();

  return (
    <>
      <ul>{todos?.map(todo => <TodoItem key={todo.id} todo={todo} />)}</ul>
      {httpError && <p>{httpError.message}</p>}
    </>
  );
};

export default Todo;
