import { useEffect } from "react";

import TodoItem from "../component/todo/TodoItem";
import useAddTodoSend from "../fetch/useAddTodoSend";
import useTodoFetch from "../fetch/useTodoFetch";
import useForm from "../hook/useForm";
import useHttpError from "../hook/useHttpError";
import usePageAccess from "../hook/usePageAccess";
import { TodoFrom } from "../services/todo";

const Todo = () => {
  const { data: todos, error } = useTodoFetch();
  const { send: addTodo } = useAddTodoSend();
  const { httpError, getHttpError } = useHttpError();
  const { register, onSubmit } = useForm<TodoFrom>({
    initialValue: { todo: "" },
  });

  const handleAddTodo = (value: TodoFrom) => {
    addTodo(value, { onError: getHttpError });
  };

  useEffect(() => {
    getHttpError(error);
  }, [error, getHttpError]);

  usePageAccess();

  return (
    <>
      <form onSubmit={onSubmit(handleAddTodo)}>
        <input data-testid="new-todo-input" {...register("todo")} />
        <button data-testid="new-todo-add-button">추가</button>
      </form>
      <ul>{todos?.map(todo => <TodoItem key={todo.id} todo={todo} />)}</ul>
      {httpError && <p>{httpError.message}</p>}
    </>
  );
};

export default Todo;
