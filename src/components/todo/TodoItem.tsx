import { useState } from "react";

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
    <li key={todo.id}>
      {edittable ? (
        <form onSubmit={onSubmit(handleSubmit)}>
          <Input {...register("todo")} testId="modify-input" />
          <Button label="수정" testId="submit-button" />
          <Button label="취소" onClick={handleCancleClick} testId="cancel-button" />
        </form>
      ) : (
        <>
          <label style={{ marginRight: 12 }}>
            <input type="checkbox" checked={todo.isCompleted} onChange={handleCompletClick} />
            <span>{todo.todo}</span>
          </label>
          <Button label="수정" onClick={handleEditClick} testId="modify-button" />
          <Button label="삭제" onClick={handleDeletClick} testId="delete-button" />
        </>
      )}
    </li>
  );
};

export default TodoItem;
