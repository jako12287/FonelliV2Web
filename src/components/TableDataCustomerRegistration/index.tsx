import styles from "../../styles/TableDataCustomerRegistration.module.css";
import IconEdit from "../../assets/icons/edit.png";
import IconTrash from "../../assets/icons/trash.png";
import { useNavigate } from "react-router-dom";

interface fakeDataProps {
  _id: string;
  password: string;
  type: string;
}

const fakeData: fakeDataProps[] = [
  {
    _id: "235695",
    password: "556478",
    type: "Cliente",
  },
  {
    _id: "655695",
    password: "556478",
    type: "Colaborador",
  },
  {
    _id: "215695",
    password: "452394",
    type: "Colaborador",
  },
];
const TableData = () => {
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
          {fakeData.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.password}</td>
              <td>{item.type}</td>
              <td>
                <img
                  onClick={() => navigator("/edit-user/1234567")}
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
