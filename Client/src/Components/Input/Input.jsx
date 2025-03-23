import styles from "./Input.module.css";

function Input({ dispatch, inputval }) {
  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        placeholder="type something ..."
        onChange={(e) => dispatch({ type: "input", payload: e.target.value })}
        value={inputval}
      />
      <button>Y</button>
    </div>
  );
}

export default Input;
