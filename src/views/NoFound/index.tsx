import { useNavigate } from "react-router-dom";
import styles from "../../styles/NoFound.module.css";

const NoFound = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.notfoundContainer}>
      <div className={styles.notfoundContent}>
        <h1 className={styles.notfoundTitle}>404</h1>
        <p className={styles.notfoundMessage}>
          Oops! La página que buscas no fue encontrada.
        </p>
        <button
          className={styles.notfoundButton}
          onClick={() => navigate("/home")}
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default NoFound;
