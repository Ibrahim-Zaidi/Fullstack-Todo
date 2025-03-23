import styles from "./Title.module.css";

function Title() {
  return (
    <div className={styles.titleContainer}>
      <h1>TODO</h1>
      <div>
        <img src="/sun.svg" alt="mood" />
      </div>
    </div>
  );
}

export default Title;
