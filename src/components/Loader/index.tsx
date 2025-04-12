import { FC } from "react";
import styles from "../../styles/Loader.module.css"; // Importar el archivo CSS

interface Props {
  text?:string
}

const Loader:FC<Props> = ({text = 'Cargando. Por favor, espera...'}) => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
      <p className={styles.loaderText}>{text}</p>
    </div>
  );
};

export default Loader;