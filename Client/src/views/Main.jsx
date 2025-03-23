import styles from "./Main.module.css";
import Title from "../Components/Title/Title";
import TodoContainer from "../Components/TodoContainer/TodoContainer";
import Input from "../Components/Input/Input";
import Footer from "../Components/Footer/Footer";
import { useEffect, useReducer, useState } from "react";
import "dotenv/config";

let initialValues = {
  todos: [],
  inputval: "",
  filter: "allEl",
};

async function postTodos(todo) {
  try {
    const res = await fetch(`${DATABASE_URL}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (!res.ok) throw new Error("something went wrong .. ");

    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteTodo(id) {
  console.log(id);

  try {
    const res = await fetch(`${DATABASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!res.ok) throw new Error("error deleting the todo");

    return await res.json();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "fetching_data":
      return {
        ...state,
        todos: [...action.payload],
      };

    case "input":
      return {
        ...state,
        inputval: action.payload,
      };
    case "add_todo":
      action.payload.preventDefault();

      const new_todo = {
        inputval: state.inputval,
        done: false,
      };

      if (!state.inputval) return state;

      postTodos(new_todo);

      return {
        ...state,
        inputval: "",
        todos: [...state.todos, new_todo],
      };

    case "delete_todo":
      const id_ = action.payload;

      deleteTodo(id_);

      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== id_),
      };

    case "done":
      const id = action.payload;

      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        ),
      };
    case "all":
      return {
        ...state,
        filter: "allEl",
      };
    case "active":
      return {
        ...state,
        filter: "activeEl",
      };
    case "completed":
      return {
        ...state,
        filter: "completedEl",
      };
  }
}

function Main() {
  const [{ todos, inputval, filter }, dispatch] = useReducer(
    reducer,
    initialValues
  );

  useEffect(
    function () {
      async function fetchTodos() {
        try {
          const res = await fetch(`${DATABASE_URL}`, {
            method: "GET",
            headers: { "content-type": "application/json" },
          });

          if (!res.ok) throw new Error(error.message);

          const data = await res.json();

          dispatch({ type: "fetching_data", payload: data });
        } catch (error) {
          console.log(error);
        }
      }

      fetchTodos();
    },

    []
  );

  function filterArr() {
    if (filter === "allEl") return todos;
    if (filter === "activeEl") return todos.filter((todo) => !todo.done);
    if (filter === "completedEl") return todos.filter((todo) => todo.done);
    return [];
  }

  return (
    <form
      className={styles.Container}
      onSubmit={(e) => dispatch({ type: "add_todo", payload: e })}
    >
      <Title />
      <Input dispatch={dispatch} inputval={inputval} />
      <TodoContainer
        todos={todos}
        dispatch={dispatch}
        filterArr={filterArr()}
      />
      <Footer dispatch={dispatch} />
    </form>
  );
}

export default Main;
