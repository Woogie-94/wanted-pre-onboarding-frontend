import { Todo } from "../../interface/todo";
import { TodoEditPayload } from "../../services/todo";

interface Props {
  todo: Todo;
  onChecked: (value: TodoEditPayload) => void;
  onDeleted: (id: number) => void;
}
const TodoItem = ({ todo, onChecked, onDeleted }: Props) => {
  return (
    <li key={todo.id}>
      <label style={{ marginRight: 12 }}>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onClick={() => onChecked({ ...todo, isCompleted: !todo.isCompleted })}
        />
        <span>{todo.todo}</span>
      </label>
      <button data-testid="modify-button">수정</button>
      <button data-testid="delete-button" onClick={() => onDeleted(todo.id)}>
        삭제
      </button>
    </li>
  );
};

export default TodoItem;
