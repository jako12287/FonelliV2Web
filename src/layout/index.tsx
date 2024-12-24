import { FC, ReactNode, useEffect } from "react";
import styles from "../styles/Layout.module.css";
import Menu from "../components/Menu";
import Notification from "../components/Notification";
// import toast from "react-hot-toast";
import { getMessaging, onMessage } from "firebase/messaging";
import { app } from "../api/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { setRefetch } from "../redux/slices/refecthRealTime";
import ModalNotify from "../views/modalNotify";
import { RootState } from "../redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface PropsLayout {
  children: ReactNode;
}
const Layout: FC<PropsLayout> = ({ children }) => {
  const messaging = getMessaging(app);
  const dispatch = useDispatch();
  const openModal = useSelector(
    (state: RootState) => state.openModalNotify.open
  );

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      let onMessageRegistered = false;

      if (onMessageRegistered) {
        console.log("El listener de `onMessage` ya está registrado");
        return;
      }

      const unsubscribe = onMessage(messaging, (payload) => {
        if (payload.notification) {
          const message = (
            <div>
              <strong>{payload.notification.title}</strong> <br />
              {payload.notification.body}
            </div>
          );
          toast.success(message, {
            position: "top-right", // Ubicación de la notificación
            autoClose: 10000, // Duración en milisegundos (10 segundos)
            style: {
              backgroundColor: "#23A4CC", // Color de fondo
              color: "#fff", // Color del texto
              fontFamily: "Poppins", // Fuente
              fontWeight: "600", // Peso de la fuente
            },
          });

          dispatch(setRefetch(true));
        }
      });

      onMessageRegistered = true; // Marca el listener como registrado

      // Función de limpieza
      return () => {
        console.log("Limpiando el listener de `onMessage`");
        unsubscribe();
        isMounted = false;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={styles.container}>
      <section className={styles.sectionMenu}>
        <Menu />
        <ToastContainer />
      </section>
      <section className={styles.sectionContent}>
        <Notification />
        {openModal && <ModalNotify />}
        {children}
      </section>
    </main>
  );
};

export default Layout;
