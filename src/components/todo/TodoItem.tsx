import { useState } from "react";
import { styled } from "styled-components";

import useForm from "../../hooks/useForm";
import { Todo } from "../../interfaces/todo";
import { TodoEditParams, TodoFrom } from "../../services/todo";
import Button from "../common/Button";
import Input from "../common/Input";

interface Props {
  todo: Todo;
  onChecked: (value: TodoEditParams) => void;
  onEdited: (value: TodoEditParams) => void;
  onDeleted: (id: number) => void;
}
const TodoItem = ({ todo, onChecked, onEdited, onDeleted }: Props) => {
  const [edittable, setEdittable] = useState(false);
  const { value, register, onSubmit, resetValue } = useForm<TodoFrom>({
    initialValue: { todo: todo.todo },
  });

  const handleSubmit = () => {
    onEdited({ ...todo, todo: value.todo });
    setEdittable(false);
  };

  const handleEditClick = () => {
    setEdittable(true);
  };

  const handleDeletClick = () => {
    onDeleted(todo.id);
  };

  const handleCancleClick = () => {
    setEdittable(false);
    resetValue();
  };

  const handleCompletClick = () => {
    onChecked({ ...todo, isCompleted: !todo.isCompleted });
  };

  return (
    <Wrapper>
      {edittable ? (
        <Form onSubmit={onSubmit(handleSubmit)}>
          <Input {...register("todo")} testId="modify-input" />
          <FormButtonWrapper>
            <Button type="text" size="medium" fitContent label="수정" testId="submit-button" />
            <Button
              type="text"
              size="medium"
              fitContent
              label="취소"
              onClick={handleCancleClick}
              testId="cancel-button"
            />
          </FormButtonWrapper>
        </Form>
      ) : (
        <ItemWrapper>
          <ItemLabelWrapper>
            <ItemCheckbox
              type="checkbox"
              id={`checkbox-${todo.id}`}
              checked={todo.isCompleted}
              onChange={handleCompletClick}
            />
            <label htmlFor={`checkbox-${todo.id}`} />
            <ItemLabel $checked={todo.isCompleted}>{todo.todo}</ItemLabel>
          </ItemLabelWrapper>
          <ButtonWrapper>
            <Button
              type="text"
              size="medium"
              fitContent
              label="수정"
              onClick={handleEditClick}
              testId="modify-button"
            />
            <Button
              type="text"
              size="medium"
              fitContent
              label="삭제"
              onClick={handleDeletClick}
              testId="delete-button"
            />
          </ButtonWrapper>
        </ItemWrapper>
      )}
    </Wrapper>
  );
};

export default TodoItem;

const Wrapper = styled.li``;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ItemLabelWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;
const ItemCheckbox = styled.input`
  display: none;

  + label {
    cursor: pointer;
    min-width: 12px;
    height: 12px;
    margin-right: 12px;
    border: 2px solid #3b3c4280;
    border-radius: 4px;
  }

  &:checked + label {
    border: none;
    background-color: #3b3c4280;
  }
`;
const ItemLabel = styled.p<{ $checked: boolean }>`
  font-size: 16px;
  color: ${({ $checked }) => ($checked ? "#3b3c4280" : "#3b3c42")};
  text-decoration: ${({ $checked }) => ($checked ? "line-through" : "none")};
`;
const ButtonWrapper = styled.div`
  display: flex;
`;

const Form = styled.form`
  display: flex;
  gap: 8px;
`;
const FormButtonWrapper = styled.div`
  display: flex;
`;
