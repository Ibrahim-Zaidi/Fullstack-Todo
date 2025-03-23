function TodoElement({ todo, dispatch }) {
  const textDeco = todo.done
    ? { textDecoration: "line-through" }
    : { textDecoration: "none" };

  return (
    <li>
      <input
        type="checkbox"
        onChange={() => dispatch({ type: "done", payload: todo.id })}
        checked={todo.done}
      />
      <label style={textDeco}>{todo.inputval}</label>
      <button
        onClick={() => dispatch({ type: "delete_todo", payload: todo.id })}
      >
        <img src="./cc.svg" />
      </button>
    </li>
  );
}

export default TodoElement;
