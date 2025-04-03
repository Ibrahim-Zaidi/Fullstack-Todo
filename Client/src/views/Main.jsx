import styles from "./Main.module.css";
import Title from "../Components/Title/Title";
import TodoContainer from "../Components/TodoContainer/TodoContainer";
import Input from "../Components/Input/Input";
import Footer from "../Components/Footer/Footer";

function Main() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form className={styles.Container} onSubmit={(e) => handleSubmit(e)}>
      <Title />
      <Input />
      <TodoContainer />
      <Footer />
    </form>
  );
}

export default Main;
