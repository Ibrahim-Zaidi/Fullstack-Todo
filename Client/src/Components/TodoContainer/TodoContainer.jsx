import styles from "./TodoContainer.module.css";
import TodoElement from "./TodoElement";

function TodoContainer({ todos, dispatch, filterArr }) {
  return (
    <div>
      <ul className={styles.todoContainer}>
        {filterArr.map((todo) => (
          <TodoElement todo={todo} key={todo.id} dispatch={dispatch} />
        ))}
      </ul>
    </div>
  );
}

export default TodoContainer;
