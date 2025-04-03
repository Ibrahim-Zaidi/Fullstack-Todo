import { useTodo } from "../../Contexts/todoContext";
import styles from "./TodoContainer.module.css";
import TodoElement from "./TodoElement";

function TodoContainer() {
  const {
    state: { todos },
  } = useTodo();

  return (
    <div>
      <ul className={styles.todoContainer}>
        {todos.map((todo) => (
          <TodoElement todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoContainer;
