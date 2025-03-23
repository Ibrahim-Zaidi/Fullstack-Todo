import styles from "./Footer.module.css";

function Footer({ dispatch }) {
  return (
    <div className={styles.footerContainer}>
      <label>All done</label>
      <div>
        <label onClick={() => dispatch({ type: "all" })}>All</label>
        <label onClick={() => dispatch({ type: "active" })}>Active</label>
        <label onClick={() => dispatch({ type: "completed" })}>Completed</label>
      </div>
      <label>Clear Completed</label>
    </div>
  );
}

export default Footer;
