import styles from "./Input.module.css";
import { useTodo } from "../../Contexts/todoContext";
function Input() {
  const {
    state: { inputVal },
    add_todo,
    dispatch,
  } = useTodo();

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        placeholder="type something ..."
        onChange={(e) =>
          dispatch({ type: "setInputValue", payload: e.target.value })
        }
        value={inputVal}
      />
      <button onClick={() => add_todo()}>Y</button>
    </div>
  );
}

export default Input;
