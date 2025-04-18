import styles from "./Main.module.css";
import Title from "../Components/Title/Title";
import TodoContainer from "../Components/TodoContainer/TodoContainer";
import Input from "../Components/Input/Input";
import Footer from "../Components/Footer/Footer";
import { useAuth } from "../Contexts/authContext";
import api from "../api/axios";
import { Navigate } from "react-router";

function Main() {
  const {
    isLoading,
    user: { username },
  } = useAuth();
  console.log(username);

  async function handleLogout() {
    try {
      const logout = await api.post("/main/logout");

      if (logout.status === 200) return <Navigate to="/login" replace />;

      console.log(logout);
    } catch (err) {
      console.log(err);
    }
  }

  if (isLoading) return <h1>Waiting ...</h1>;

  return (
    <>
      <div className={styles.user}>
        <h1>{username}</h1>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Lougout
        </button>
      </div>
      <form className={styles.Container}>
        <Title />
        <Input />
        <TodoContainer />
        <Footer />
      </form>
    </>
  );
}

export default Main;
