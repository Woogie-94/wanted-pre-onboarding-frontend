import { useEffect } from "react";

import Button from "../components/common/Button";
import Input from "../components/common/Input";
import TodoItem from "../components/todo/TodoItem";
import useForm from "../hooks/useForm";
import useHttpError from "../hooks/useHttpError";
import usePageAccess from "../hooks/usePageAccess";
import useAddTodoMutation from "../querys/useAddTodoMutation";
import useDeleteTodoMutation from "../querys/useDeleteTodoMutation";
import useEditTodoMutation from "../querys/useEditTodoMutation";
import useTodoQuery from "../querys/useTodoQuery";
import { TodoEditParams, TodoFrom } from "../services/todo";

const Todo = () => {
  const { data: todos, error } = useTodoQuery();
  const { mutate: addTodo, isLoading } = useAddTodoMutation();
  const { mutate: editTodo } = useEditTodoMutation();
  const { mutate: deleteTodo } = useDeleteTodoMutation();
  const { httpError, getHttpError } = useHttpError();
  const { register, onSubmit, resetValue } = useForm<TodoFrom>({
    initialValue: { todo: "" },
  });

  const handleAddTodo = (value: TodoFrom) => {
    addTodo(value.todo, {
      onSuccess: () => {
        resetValue();
      },
      onError: getHttpError,
    });
  };

  const handleChecked = (params: TodoEditParams) => {
    editTodo(params, { onError: getHttpError });
  };

  const handleEdited = (params: TodoEditParams) => {
    editTodo(params, { onError: getHttpError });
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
        <Input {...register("todo")} testId="new-todo-input" />
        <Button label="추가" loading={isLoading} testId="new-todo-add-button" />
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
