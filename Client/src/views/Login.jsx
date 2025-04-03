import styles from "./Login.module.css";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../Contexts/authContext";

let empty = "";

const initialValues = {
  email: empty,
  password: empty,
};

function loginReducer(state, action) {
  switch (action.type) {
    case "setEmail": {
      return {
        ...state,
        email: action.payload,
      };
    }
    case "setPassword": {
      return {
        ...state,
        password: action.payload,
      };
    }

    default: {
      throw new Error("action Uknown");
    }
  }
}

function Login() {
  const [{ email, password }, dispatch] = useReducer(
    loginReducer,
    initialValues
  );
  // const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login, error } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await login(email, password);
      console.log(res);
      if (!res) throw new Error(error);
    } catch (err) {
      // setError(err);
      console.log(err);
    }
  }

  // console.log(error);

  return (
    <>
      <h1 className={styles.bigTitle}>Welcome To our TODO!</h1>
      <div className={styles.login_container}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label> Email </label>
            <input
              type="text"
              onChange={(e) =>
                dispatch({ type: "setEmail", payload: e.target.value })
              }
            />
          </div>
          <div>
            <label> Password </label>
            <input
              type="text"
              onChange={(e) =>
                dispatch({ type: "setPassword", payload: e.target.value })
              }
            />
          </div>
          <div className={styles.btns_container}>
            <button onClick={(e) => handleSubmit(e)}>login</button>
            <p>
              register <span onClick={() => navigate("/register")}>here</span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
