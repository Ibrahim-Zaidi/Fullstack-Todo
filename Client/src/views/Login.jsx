import styles from "./Login.module.css";
import { useReducer } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../Contexts/authContext";

const initialValues = {
  identifier: "",
  password: "",
};

function loginReducer(state, action) {
  switch (action.type) {
    case "setIdentifier": {
      return {
        ...state,
        identifier: action.payload,
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
  const [{ identifier, password }, dispatch] = useReducer(
    loginReducer,
    initialValues
  );
  const { login, error, isLoading, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (isAuthenticated) navigate("/");

      const res = await login(identifier, password);
      if (res) navigate("/");
      if (!res) throw new Error(error);
    } catch (err) {
      console.log(err);
    }
  }

  if (isLoading) return <h1>Waiting ...</h1>;

  if (!isLoading)
    return (
      <>
        <h1 className={styles.bigTitle}>Welcome To our TODO!</h1>
        <div className={styles.login_container}>
          <h1 className={styles.title}>Login page </h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label> identifier </label>
              <input
                type="email"
                onChange={(e) =>
                  dispatch({ type: "setIdentifier", payload: e.target.value })
                }
              />
            </div>
            <div>
              <label> Password </label>
              <input
                type="password"
                onChange={(e) =>
                  dispatch({ type: "setPassword", payload: e.target.value })
                }
              />
            </div>
          </form>
          <div className={styles.btns_container}>
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              login
            </button>
            <button onClick={() => navigate("/register")}>register here</button>
          </div>
        </div>
      </>
    );
}

export default Login;
