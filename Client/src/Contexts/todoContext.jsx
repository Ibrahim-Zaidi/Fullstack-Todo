import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./authContext";
import api from "../api/axios";

// import { redirect } from "react-router";

const initialValues = {
  todos: [],
  inputVal: "",
  done: false,
  filter: "all",
};

function reducer(state, action) {
  switch (action.type) {
    case "setInputValue": {
      return { ...state, inputVal: action.payload };
    }
    case "fetch_todos": {
      return { ...state, todos: [...action.payload] };
    }
    case "clear_input":
      return {
        ...state,
        inputVal: "",
      };
    case "add_todo":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    default: {
      return state;
    }
  }
}

const TodoContext = createContext();

///////////////////////////

function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialValues);
  const { user, isAuthenticated } = useAuth();

  useEffect(
    function () {
      async function get_initial_todos() {
        if (isAuthenticated) {
          try {
            const response = await api().get("/main");
            dispatch({ type: "fetch_todos", payload: response.data });
          } catch (err) {
            console.log("failed to fetch " + err);
          }
        }
      }
      get_initial_todos();
    },
    [user, isAuthenticated]
  );

  async function add_todo() {
    try {
      const content = state.inputVal;
      const done = state.done;

      const res = await api().post("/main/add", {
        content,
        done,
      });

      dispatch({ type: "add_todo", payload: response.data });
      dispatch({ type: "clear_input" });

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <TodoContext.Provider value={{ state, dispatch, add_todo }}>
      {children}
    </TodoContext.Provider>
  );
}

function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined)
    console.log("context is called before initialzed!");

  return context;
}

export { TodoProvider, useTodo };
