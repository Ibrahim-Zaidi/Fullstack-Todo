import styles from "./Register.module.css";
import { useReducer } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";

const initialValues = {
  username: "",
  number: "",
  email: "",
  password: "",
  error: "",
  success: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "setUsername": {
      return { ...state, username: action.payload };
    }
    case "setNumber": {
      return { ...state, number: action.payload };
    }
    case "setEmail": {
      return { ...state, email: action.payload };
    }
    case "setPassword": {
      return { ...state, password: action.payload };
    }
    case "success": {
      return { ...state, success: action.payload, error: "" };
    }

    case "error": {
      return { ...state, error: action.payload, success: "" };
    }
    case "reset": {
      return initialValues;
    }

    default: {
      throw new Error("unkown action");
    }
  }
}

function Register() {
  const [{ username, number, password, email, error, success }, dispatch] =
    useReducer(reducer, initialValues);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!username || !number || !email || !password) {
        dispatch({ type: "error", payload: "All fields must be filled out" });
        return;
      }

      const response = await api.post("/register", {
        username,
        number,
        email,
        password,
      });
      console.log(response);

      dispatch({ type: "success", payload: "registation successful!" });
      dispatch({ type: "reset" });

      navigate("/login");
    } catch (error) {
      dispatch({ type: "error", payload: "regsitration failed" });
    }
  }

  return (
    <>
      <div className={styles.title}>
        <h1>Sign to our TODO</h1>
      </div>

      <form onSubmit={(e) => handleSubmit(e)} className={styles.form_container}>
        {error && <h2>{error}</h2>}
        {success && <h2>{success}</h2>}
        <div>
          <label> Username </label>
          <input
            type="text"
            onChange={(e) =>
              dispatch({ type: "setUsername", payload: e.target.value })
            }
          />
        </div>
        <div>
          <label> Number </label>
          <input
            type="text"
            onChange={(e) =>
              dispatch({ type: "setNumber", payload: e.target.value })
            }
          />
        </div>
        <div>
          <label> Email </label>

          <input
            type="email"
            onChange={(e) =>
              dispatch({ type: "setEmail", payload: e.target.value })
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
      <div className={styles.btn_container}>
        <button onClick={() => navigate("/login")}>LogIn</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
}

export default Register;
