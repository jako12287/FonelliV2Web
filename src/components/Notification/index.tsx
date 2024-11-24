import styles from "../../styles/Nav.module.css";
import bell from "../../assets/icons/bell.png";
import bellActive from "../../assets/icons/bellActive.png";
import HomeIcon from "../../assets/icons/home.png";
import XlsIcon from "../../assets/icons/xls.png";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomButtonNavigate from "../CustomButtonNavigate";
const Notification = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <nav className={styles.container}>
      {location.pathname === "/customer-registration" ? (
        <div className={styles.containerBtnUser}>
          <CustomButtonNavigate route="/create-user" text="Agregar Usuario" type="special"/>
        </div>
      ) : null}
      <div
        className={styles.containerImageHome}
        onClick={() => navigation("/home")}
      >
        <img src={HomeIcon} className={styles.image} />
      </div>
      <div
        className={styles.containerImage}
        onClick={() => setIsActive(!isActive)}
      >
        {!isActive ? (
          <img src={bell} className={styles.image} />
        ) : (
          <img src={bellActive} className={styles.image} />
        )}
      </div>
      {location.pathname === "/customer-registration" ? (
        <div className={styles.containerImageHome}>
          <img src={XlsIcon} className={styles.image} />
        </div>
      ) : null}
    </nav>
  );
};

export default Notification;
