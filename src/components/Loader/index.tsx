import styles from "../../styles/Loader.module.css"; // Importar el archivo CSS

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
      <p className={styles.loaderText}>Cargando. Por favor, espera...</p>
    </div>
  );
};

export default Loader;