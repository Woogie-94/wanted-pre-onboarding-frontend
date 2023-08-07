import { useState } from "react";

import useForm from "../../hook/useForm";
import { Todo } from "../../interface/todo";
import { TodoEditPayload, TodoFrom } from "../../services/todo";

interface Props {
  todo: Todo;
  onChecked: (value: TodoEditPayload) => void;
  onEdited: (value: TodoEditPayload) => void;

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

  return (
    <li key={todo.id}>
      {edittable ? (
        <form onSubmit={onSubmit(handleSubmit)}>
          <input data-testid="modify-input" value={value.todo} {...register("todo")} />
          <button data-testid="submit-button">제출</button>
          <button
            data-testid="cancel-button"
            onClick={() => {
              setEdittable(false);
              resetValue();
            }}
          >
            취소
          </button>
        </form>
      ) : (
        <>
          <label style={{ marginRight: 12 }}>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => onChecked({ ...todo, isCompleted: !todo.isCompleted })}
            />
            <span>{todo.todo}</span>
          </label>
          <button data-testid="modify-button" onClick={() => setEdittable(true)}>
            수정
          </button>
          <button data-testid="delete-button" onClick={() => onDeleted(todo.id)}>
            삭제
          </button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
