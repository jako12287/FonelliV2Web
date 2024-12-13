import { FC, ReactNode } from "react";
import styles from "../styles/Layout.module.css";
import Menu from "../components/Menu";
import Notification from "../components/Notification";
import { getMessaging, onMessage } from "firebase/messaging";
// import toast from "react-hot-toast";
import { app } from "../api/firebaseConfig";
import toast from "react-hot-toast";
// import toast from "react-hot-toast";
interface PropsLayout {
  children: ReactNode;
}
const Layout: FC<PropsLayout> = ({ children }) => {
  console.log("Firebase app initialized:", app);
  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload.notification);
    if (payload?.notification) {
      const message = `${payload.notification.title} ${payload.notification.body}`;
      toast.success(message as string, {
        position: "top-center",
        duration: 10000,
        icon: payload.notification.icon,
        style:{backgroundColor:"#23A4CC90", color:"#fff", fontFamily:"Poppins", fontWeight:"600"}
      });
    }
  });

  
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
