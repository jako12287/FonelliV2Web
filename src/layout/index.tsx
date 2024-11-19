import { FC, ReactNode } from "react";
import styles from "../styles/Layout.module.css";
import Menu from "../components/Menu";
import Notification from "../components/Notification";

interface PropsLayout {
  children: ReactNode;
}
const Layout: FC<PropsLayout> = ({ children }) => {
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
