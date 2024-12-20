import { FC, ReactNode, useEffect } from "react";
import styles from "../styles/Layout.module.css";
import Menu from "../components/Menu";
import Notification from "../components/Notification";
import toast from "react-hot-toast";
import { getMessaging, onMessage } from "firebase/messaging";
import { app } from "../api/firebaseConfig";
import { useDispatch } from "react-redux";
import { setRefetch } from "../redux/slices/refecthRealTime";
interface PropsLayout {
  children: ReactNode;
}
const Layout: FC<PropsLayout> = ({ children }) => {
  const messaging = getMessaging(app);
  const dispatch = useDispatch();
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      let onMessageRegistered = false;

      if (onMessageRegistered) {
        console.log("El listener de `onMessage` ya está registrado");
        return;
      }

      const unsubscribe = onMessage(messaging, (payload) => {
        console.log("Mensaje recibido:", payload);

        if (payload.notification) {
          console.log("Actualización de la data aquí");

          const message = `${payload.notification.title} ${payload.notification.body}`;
          toast.success(message, {
            position: "top-center",
            duration: 10000,
            icon: payload.notification.icon,
            style: {
              backgroundColor: "#23A4CC90",
              color: "#fff",
              fontFamily: "Poppins",
              fontWeight: "600",
            },
          });
          dispatch(setRefetch(true))
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
      </section>
      <section className={styles.sectionContent}>
        <Notification />
        {children}
      </section>
    </main>
  );
};

export default Layout;
