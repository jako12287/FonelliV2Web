import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/ModalNotify.module.css";
import { setOpen } from "../../redux/slices/openModalNotify";
import { deleteNotification, getAllNotify } from "../../api";
import { useEffect, useState } from "react";
import { stateType } from "../../types";
import Loader from "../../components/Loader";
import CardNotify from "../../components/CardNotify";
import { setRefetch } from "../../redux/slices/refecthRealTime";
import { RootState } from "../../redux/store";

interface NotifyProps {
  caratage: string; // Quilataje del producto
  color: string; // Color especificado
  createdAt: string; // Fecha de creación en formato timestamp
  email: string; // Email del usuario
  id: string; // ID único de la notificación o registro
  model: string; // Modelo del producto
  orderId: string; // ID de la orden asociada
  status: stateType; // Estado de la orden (e.g., PENDING, COMPLETED)
  userId: string; // ID del usuario asociado
}

const ModalNotify = () => {
  const dispatch = useDispatch();
  const refetchRealTime = useSelector(
    (state: RootState) => state.refetchRealTime.refetch
  );

  const [Data, setData] = useState<NotifyProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAll = async () => {
    setIsLoading(true);
    try {
      const response = await getAllNotify();
      if (response) {
        setData(response);
      }
    } catch (error) {
      console.log("error al traer las notificaciones", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  const handleDelete = async (notificationId: string) => {
    try {
      await deleteNotification(notificationId);
      getAll();
      dispatch(setOpen(false));
      dispatch(setRefetch(true));
    } catch (error) {
      console.log("error al eliminar la notificación", error);
    }
  };

  useEffect(() => {
    if (refetchRealTime) {
      getAll();
      dispatch(setRefetch(false));
    }
  }, [refetchRealTime, dispatch]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div
          className={styles.containerClose}
          onClick={() => dispatch(setOpen(false))}
        >
          <h5>Cerrar</h5>
        </div>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.containerClose}
        onClick={() => dispatch(setOpen(false))}
      >
        <h5>Cerrar</h5>
      </div>
      <div>
        {Data.length > 0 ? (
          Data.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ).map((el: any) => (
            <CardNotify
              key={el.id}
              createdAt={el.createdAt}
              customerNumber={el.customerNumber}
              model={el.model}
              status={el.status}
              id={el.id}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <h5 className={styles.textNoData}>No hay notificaciones aún</h5>
        )}
      </div>
    </div>
  );
};

export default ModalNotify;
