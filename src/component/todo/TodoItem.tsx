import { Todo } from "../../interface/todo";

interface Props {
  todo: Todo;
}
const TodoItem = ({ todo }: Props) => {
  return (
    <li key={todo.id}>
      <label>
        <input type="checkbox" checked={todo.isComplated} />
        <span>{todo.todo}</span>
      </label>
    </li>
  );
};

export default TodoItem;
