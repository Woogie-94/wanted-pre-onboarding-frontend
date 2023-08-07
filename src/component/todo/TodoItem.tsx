import { Todo } from "../../interface/todo";
import { TodoEditPayload } from "../../services/todo";

interface Props {
  todo: Todo;
  onChecked: (value: TodoEditPayload) => void;
}
const TodoItem = ({ todo, onChecked }: Props) => {
  return (
    <li key={todo.id}>
      <label>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onClick={() => onChecked({ ...todo, isCompleted: !todo.isCompleted })}
        />
        <span>{todo.todo}</span>
      </label>
    </li>
  );
};

export default TodoItem;
