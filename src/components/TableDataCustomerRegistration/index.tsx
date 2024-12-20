import styles from "../../styles/TableDataCustomerRegistration.module.css";
import IconEdit from "../../assets/icons/edit.png";
import IconTrash from "../../assets/icons/trash.png";
import { useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { DataTableUser, userType } from "../../types";

const TableData: FC<DataTableUser> = ({ data, handleDelete }) => {
  const navigator = useNavigate();

  const [filteredData, setFilteredData] = useState<any[]>(data);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const sortedData = [...filteredData].sort((a: any, b: any) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA; // Más reciente primero
  });

  const handleFilter = (dataOption: any) => {
    console.log("en el selector", dataOption.target.value);
    if (dataOption.target.value === userType.CUSTOMER) {
      const dataFilter = data.filter(
        (el: any) => el.type === userType.CUSTOMER
      );
      setFilteredData(dataFilter);
    } else if (dataOption.target.value === userType.COLLABORATOR) {
      const dataFilter = data.filter(
        (el: any) => el.type === userType.COLLABORATOR
      );
      setFilteredData(dataFilter);
    } else {
      // Si es "TODOS", mostramos todos los datos
      setFilteredData(data);
    }
  };

  return (
    <div className={styles.tableContainer}>
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "20rem",
          fontFamily: "Poppins",
          fontWeight: "400",
          color: "#183E6F",
        }}
      >
        <h3>Filtro por tipo de cuenta : </h3>
        <select
          onChange={handleFilter}
          style={{
            fontFamily: "Poppins",
            fontWeight: "400",
            color: "#183E6F",
          }}
        >
          <option value={"TODOS"}>Todos</option>
          <option value={userType.CUSTOMER}>Clientes</option>
          <option value={userType.COLLABORATOR}>Colaboradores</option>
        </select>
      </div>
      <table className={styles.customTable}>
        <thead>
          <tr>
            <th>Número de cliente</th>
            <th>Contraseña</th>
            <th>Tipo de perfil</th>
            <th>Modificar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item: any) => (
            <tr key={item.id}>
              <td>
                {item.type === userType.CUSTOMER
                  ? item.customerNumber || item.id
                  : item.type === userType.COLLABORATOR
                  ? item.email || item.id
                  : item.id}
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
