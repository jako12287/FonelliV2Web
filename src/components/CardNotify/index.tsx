import styles from "../../styles/CardNotify.module.css";

type props = {
  email: string;
  id: string;
  model: string;
  status: string;
  createdAt: string;
  handleDelete: (data:string) => void;
};

const CardNotify = ({
  id,
  email,
  model,
  status,
  createdAt,
  handleDelete,
}: props) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 onClick={() => handleDelete(id)}>Borrar</h3>
      </div>
      <div className={styles.content}>
        <h5>
          Email: <span>{email}</span>
        </h5>
        <h5>
          Modelo: <span>{model}</span>
        </h5>
        <h5>
          Status: <span>{status}</span>
        </h5>
        <h5>
          Fecha de creación: <span>{new Date(createdAt).toLocaleString()}</span>
        </h5>
      </div>
    </div>
  );
};

export default CardNotify;
