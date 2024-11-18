import styles from "../../styles/Loading.module.css";
const Loading = () => {
  return (
    <div className={styles.container}>
      <h3>FONELLI</h3>
      <div className={styles.loader} />
      <h3>Cargando...</h3>
    </div>
  );
};

export default Loading;
