import styles from "../../styles/TableDataCustomerRegistration.module.css";
import IconEdit from "../../assets/icons/edit.png";
import IconTrash from "../../assets/icons/trash.png";
import { useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { DataTableUser, userType } from "../../types";

interface Props extends DataTableUser {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  setCurrentPerPage: (data: number) => void;
  setSearchCustomer: (data:string)=>void
}

const TableData: FC<Props> = ({
  data,
  handleDelete,
  currentPage,
  totalPages,
  onPageChange,
  setCurrentPerPage,
  setSearchCustomer,
}) => {
  const navigator = useNavigate();
  const [filteredData, setFilteredData] = useState<any[]>(data);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const sortedData = [...filteredData].sort((a: any, b: any) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (value === userType.CUSTOMER) {
      const dataFilter = data.filter(
        (el: any) => el.type === userType.CUSTOMER
      );
      setFilteredData(dataFilter);
    } else if (value === userType.COLLABORATOR) {
      const dataFilter = data.filter(
        (el: any) => el.type === userType.COLLABORATOR
      );
      setFilteredData(dataFilter);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <div className={styles.tableContainer}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
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
          <h3>Filtro por tipo de cuenta:</h3>
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
          <h3>Buscar por número de cliente:</h3>
          <input type="text" style={{
            borderRadius:"1rem",
            padding:"1px 5px 1px 5px"
            }} onChange={(e)=>setSearchCustomer(String(e.target.value))}/>
        </div>

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
          <h3>Clientes por página:</h3>
          <select
            onChange={(e) => setCurrentPerPage(Number(e.target.value))}
            style={{
              fontFamily: "Poppins",
              fontWeight: "400",
              color: "#183E6F",
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
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
              <td
                style={{
                  color: item.changePass === 1 ? "#ffb2db" : "#000",
                }}
              >
                {item.verify ? "Clave personalizada" : item.password}
              </td>
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

      <div className={styles.pagination}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.pageButton}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.pageButton}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default TableData;
