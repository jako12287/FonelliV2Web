import styles from "../../styles/TableData.module.css";
import { StatusProps } from "../../types";
import LogoDownload from "../../assets/icons/download.png";

interface fakeDataProps {
  _id: string;
  date: string;
  piezas: number;
  status: StatusProps;
  folio: string;
}

const fakeData: fakeDataProps[] = [
  {
    _id: "001",
    date: "20-10-2024",
    piezas: 10,
    status: StatusProps.PENDING,
    folio: "1112",
  },
  {
    _id: "002",
    date: "20-10-2024",
    piezas: 3,
    status: StatusProps.PENDING,
    folio: "1112",
  },
  {
    _id: "003",
    date: "15-10-2024",
    piezas: 7,
    status: StatusProps.PENDING,
    folio: "1112",
  },
];
const TableData = () => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.customTable}>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>ID Cliente</th>
            <th>Piezas</th>
            <th>Estatus</th>
            <th>Descargar</th>
          </tr>
        </thead>
        <tbody>
          {fakeData.map((item) => (
            <tr key={item._id}>
              <td>{item.date}</td>
              <td>{item._id}</td>
              <td>{item.piezas} piezas</td>
              <td
                className={`${
                  item.status === "PENDING"
                    ? styles.statusPending
                    : styles.statusCaptured
                }`}
              >
                {item.status === "PENDING" ? "PENDIENTE" : "CAPTURADO"}
              </td>
              <td className={styles.cursorPointer}>
                <img src={LogoDownload} width={25} height={30} />
                <h5>EXC/PDF</h5>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
