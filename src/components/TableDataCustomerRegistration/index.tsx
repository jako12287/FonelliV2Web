import styles from "../../styles/TableDataCustomerRegistration.module.css";
import IconEdit from "../../assets/icons/edit.png";
import IconTrash from "../../assets/icons/trash.png";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { DataTableUser, userType } from "../../types";

const TableData: FC<DataTableUser> = ({ data, handleDelete }) => {
  const navigator = useNavigate();

  return (
    <div className={styles.tableContainer}>
      <table className={styles.customTable}>
        <thead>
          <tr>
            <th>ID Cliente</th>
            <th>Contraseña</th>
            <th>Tipo de perfil</th>
            <th>Modificar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>
                {item.id}
                <br />
                {item.email}
              </td>
              <td>{item.verify ? "Clave personalizada" : item.password}</td>
              <td>
                {item.type === userType.COLLABORATOR
                  ? "Colaborador"
                  : "Cliente"}
              </td>
              <td>
                <img
                  onClick={() => navigator(`/edit-user/${item.id}`)}
                  src={IconEdit}
                  width={60}
                  height={60}
                  className={styles.cursorPointer}
                />
              </td>
              <td>
                <img
                  src={IconTrash}
                  width={60}
                  height={60}
                  className={styles.cursorPointer}
                  onClick={() => handleDelete(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
