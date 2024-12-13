import styles from "../../styles/TableDataManagement.module.css";
import LogoDownload from "../../assets/icons/download.png";
import IconTrash from "../../assets/icons/trash.png";
import { useEffect, useState } from "react";
import {
  addFolio,
  changeStatusAdmin,
  deleteOrder,
  getAllOrders,
} from "../../api";
import moment from "moment";
import { stateType, userType } from "../../types";
import { downloadPDF } from "../DownloadPdf";
import { downloadExcel } from "../DownloadXls";
("moment/locale/es");
moment.locale("es");

const TableData = () => {
  const formattedDate = (date: any) => {
    return moment(date).format("DD-MMM-YYYY").toLowerCase();
  };

  const currentUser = JSON.parse(localStorage.getItem("@USER") as never)?.type
	console.log("TCL: TableData -> currentUser",currentUser )
  const [Data, setData] = useState<any>([]);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [folios, setFolios] = useState<{ [key: string]: string }>({});
  const getAllOrder = async () => {
    try {
      const response = await getAllOrders();
      const initialFolios: { [key: string]: string } = {};
      response.forEach((item: any) => {
        initialFolios[item.id] = item.folio || ""; // Usa el folio existente o un string vacío
      });
      setFolios(initialFolios);
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

  const handleDelete = async (orderId: string) => {
    const isConfirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar la orden?"
    );
    if (isConfirmed) {
      try {
        await deleteOrder(orderId);
        alert("Orden eliminada exitosamente.");
        setRefetch(true);
      } catch (error) {
        console.error("Error al eliminar la orden:", error);
        alert("Hubo un error al eliminar la orden.");
      }
    }
  };

  const handleFolioChange = (id: string, value: string) => {
    setFolios((prev) => ({
      ...prev,
      [id]: value, // Actualizar el folio solo para el ID específico
    }));
  };
  const onSubmitFolio = async (id: string) => {
    const folioValue = folios[id];

    if (!folioValue || folioValue.length < 6 || folioValue.length > 15) {
      alert("El folio debe tener entre 6 y 15 dígitos.");
      return; // Detener la ejecución si no cumple la validación
    }

    try {
      // Llamar a la función addFolio para enviar el folio al backend
      const result = await addFolio(id, folioValue);

      if (result) {
        alert("Folio agregado exitosamente.");
        // Aquí puedes hacer algo después de agregar el folio, como actualizar el estado o la UI
      }
      await changeStatusAdmin(id, stateType.CAUGHT);
      setRefetch(true);
    } catch (error) {
      alert("Hubo un error al agregar el folio.");
      console.error(error);
    }
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.customTable}>
        <thead>
          <tr>
            {currentUser !== userType.COLLABORATOR && <th></th>}
            <th>Fecha</th>
            <th>ID Cliente</th>
            <th>Piezas</th>
            <th>Estatus</th>
            <th>Ingresar Folio</th>
            <th>Descargar</th>
          </tr>
        </thead>
        <tbody>
          {Data.sort((a:any, b:any) => b?.createdAt - a?.createdAt).map((item: any) => (
            <tr key={item?.id}>
              {currentUser !== userType.COLLABORATOR && <td>
                <img
                  onClick={() => handleDelete(item.id)}
                  src={IconTrash}
                  width={60}
                  height={60}
                  className={styles.cursorPointer}
                />
              </td>}
              <td>{formattedDate(item?.createdAt)}</td>
              <td>{item?.email || item?.id}</td>
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
                {item?.folio ? (
                  item?.folio
                ) : (
                  <div>
                    <input
                      type="number"
                      value={folios[item?.id] || ""}
                      onChange={(e) =>
                        handleFolioChange(item?.id, e.target.value)
                      }
                      min={6} // 6 dígitos mínimos
                      max={15} // 15 dígitos máximos
                      // className="inputFolio"
                      style={{width:"100px"}}

                    />
                    <button onClick={() => onSubmitFolio(item?.id)}>
                      Guardar
                    </button>
                  </div>
                )}
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
