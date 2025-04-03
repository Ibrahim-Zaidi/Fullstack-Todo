import styles from "./Register.module.css";
import { useReducer } from "react";
import axios from "axios";

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
      // if (action.payload.length < 5) return;

      return { ...state, username: action.payload };
    }
    case "setNumber": {
      // if (action.payload.length < 5) return;

      return { ...state, number: action.payload };
    }
    case "setEmail": {
      // if (action.payload.length < 5) return;

      return { ...state, email: action.payload };
    }
    case "setPassword": {
      // if (action.payload.length < 5) return;

      return { ...state, password: action.payload };
    }
    case "success": {
      return;
    }
    case "error": {
    }

    default: {
      return initialValues;
    }
  }
}

function Register() {
  const [{ username, number, password, email }, dispatch] = useReducer(
    reducer,
    initialValues
  );

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/register", {
        username,
        number,
        password,
        email,
      });

      dispatch({ type: "success", payload: response.data });
    } catch (error) {
      dispatch({ type: "error", payload: error.response.data });
    }
  }

  return (
    <>
      {/* {error && <h1> {error} </h1>} */}
      <div className={styles.title}>
        <h1>Sign to our TODO</h1>
      </div>

      <form onSubmit={(e) => handleSubmit(e)} className={styles.form_container}>
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

        <button>Submit</button>
      </form>
    </>
  );
}

export default Register;
