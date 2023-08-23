import { useEffect } from "react";
import { styled } from "styled-components";

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
  const { showErrorToast } = useHttpError();
  const { register, onSubmit, resetValue } = useForm<TodoFrom>({
    initialValue: { todo: "" },
  });

  const handleAddTodo = (value: TodoFrom) => {
    addTodo(value.todo, {
      onSuccess: () => {
        resetValue();
      },
      onError: showErrorToast,
    });
  };

  const handleChecked = (params: TodoEditParams) => {
    editTodo(params, { onError: showErrorToast });
  };

  const handleEdited = (params: TodoEditParams) => {
    editTodo(params, { onError: showErrorToast });
  };

  const handleDeleted = (id: number) => {
    deleteTodo(id, { onError: showErrorToast });
  };

  useEffect(() => {
    showErrorToast(error);
  }, [error, showErrorToast]);

  usePageAccess();

  return (
    <Wrapper>
      <Content>
        <Form onSubmit={onSubmit(handleAddTodo)}>
          <Input {...register("todo")} testId="new-todo-input" />
          <Button
            type="filled"
            size="medium"
            label="추가"
            fitContent
            loading={isLoading}
            testId="new-todo-add-button"
          />
        </Form>
        <TodoListWrapper>
          {todos?.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onChecked={handleChecked}
              onEdited={handleEdited}
              onDeleted={handleDeleted}
            />
          ))}
        </TodoListWrapper>
      </Content>
    </Wrapper>
  );
};

export default Todo;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Content = styled.div`
  width: 420px;
  padding: 120px 0;
`;
const Form = styled.form`
  display: flex;
  gap: 12px;
`;
const TodoListWrapper = styled.ul`
  margin-top: 16px;
`;
