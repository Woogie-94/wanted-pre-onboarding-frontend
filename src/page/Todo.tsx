import { useEffect } from "react";

import TodoItem from "../component/todo/TodoItem";
import useAddTodoSend from "../fetch/useAddTodoSend";
import useDeleteTodoSend from "../fetch/useDeleteTodoSend";
import useEditTodoSend from "../fetch/useEditTodoSend";
import useTodoFetch from "../fetch/useTodoFetch";
import useForm from "../hook/useForm";
import useHttpError from "../hook/useHttpError";
import usePageAccess from "../hook/usePageAccess";
import { TodoEditPayload, TodoFrom } from "../services/todo";

const Todo = () => {
  const { data: todos, error } = useTodoFetch();
  const { send: addTodo } = useAddTodoSend();
  const { send: editTodo } = useEditTodoSend();
  const { send: deleteTodo } = useDeleteTodoSend();
  const { httpError, getHttpError } = useHttpError();
  const { register, onSubmit, resetValue } = useForm<TodoFrom>({
    initialValue: { todo: "" },
  });

  const handleAddTodo = (value: TodoFrom) => {
    addTodo(value, { onError: getHttpError });
    resetValue();
  };

  const handleChecked = (value: TodoEditPayload) => {
    editTodo(value, { onError: getHttpError });
  };

  const handleEdited = (value: TodoEditPayload) => {
    editTodo(value, { onError: getHttpError });
  };

  const handleDeleted = (id: number) => {
    deleteTodo(id, { onError: getHttpError });
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
      <ul>
        {todos?.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onChecked={handleChecked}
            onEdited={handleEdited}
            onDeleted={handleDeleted}
          />
        ))}
      </ul>
      {httpError && <p>{httpError.message}</p>}
    </>
  );
};

export default Todo;
