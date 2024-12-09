import styles from "../../styles/TableData.module.css";
import { stateType } from "../../types";
import LogoDownload from "../../assets/icons/download.png";
import { changeStatusAdmin, getAllOrders } from "../../api";
import { useEffect, useState } from "react";
import moment from "moment";
import { downloadPDF } from "../DownloadPdf";
import { downloadExcel } from "../DownloadXls";
("moment/locale/es");
moment.locale("es");

const TableData = () => {
  const formattedDate = (date: any) => {
    return moment(date).format("DD-MMM-YYYY").toLowerCase();
  };
  const [Data, setData] = useState<any>([]);
  const [refetch, setRefetch] = useState<boolean>(false);

  const getAllOrder = async () => {
    try {
      const response = await getAllOrders();
      if (response) {
        setData(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (refetch) {
      getAllOrder();
      setRefetch(false);
    }
  }, [refetch]);

  useEffect(() => {
    getAllOrder();
  }, []);

  const handleDownloadXls = async (item: any) => {
    downloadExcel(item);
    if (item?.statusAdmin === stateType.PENDING) {
      try {
        await changeStatusAdmin(item?.id, stateType.DOWNLOAD);
        setRefetch(true);
      } catch (error) {
        console.log("error downloading", error);
      }
    }
  };

  const handleDownloadPdf = async (item: any) => {
    downloadPDF(item);
    if (item?.statusAdmin === stateType.PENDING) {
      try {
        await changeStatusAdmin(item?.id, stateType.DOWNLOAD);
        setRefetch(true);
      } catch (error) {
        console.log("error downloading", error);
      }
    }
  };
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
          {Data.map((item: any) => (
            <tr key={item?.id}>
              <td>{formattedDate(item?.createdAt)}</td>
              <td>{item?.id}</td>
              <td>{item?.totalPieces} piezas</td>
              <td
                className={`${
                  item?.statusAdmin === stateType.PENDING
                    ? styles.statusPending
                    : item?.statusAdmin === stateType.CAUGHT
                    ? styles.statusCaptured
                    : styles.statusDownload
                }`}
              >
                {item?.statusAdmin === stateType.PENDING
                  ? "SOLICITADO"
                  : item?.statusAdmin === stateType.CAUGHT
                  ? "CAPTURADO"
                  : "DESCARGADO"}
              </td>
              <td>
                <img src={LogoDownload} width={25} height={30} />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <h5
                    className={styles.cursorPointer}
                    onClick={() => handleDownloadXls(item)}
                  >
                    EXC
                  </h5>
                  <h5
                    className={styles.cursorPointer}
                    onClick={() => handleDownloadPdf(item)}
                  >
                    /PDF
                  </h5>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
