import styles from "../../styles/Menu.module.css";
import ImageFake from "../../assets/images/SplashLogo.png";
import CustomButtonNavigate from "../CustomButtonNavigate";
import { useEffect, useState } from "react";
import { userType } from "../../types";

const Menu = () => {
  const [typeUSer, setTypeUSer] = useState<string>("COLLABORATOR");
  const [emailUSer, setEmailUSer] = useState<string>("Invitado");

  const getPermissionsUser = () => {
    const getUserString = localStorage.getItem("@USER");

    if (getUserString) {
      const getUser = JSON.parse(getUserString);

      setTypeUSer(getUser?.type);
      setEmailUSer(getUser?.email);
    } else {
      console.warn("No se encontró el usuario en localStorage");
    }
  };

  useEffect(() => {
    getPermissionsUser();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.containerImage}>
        <img src={ImageFake} className={styles.image} />
      </div>
      <div className={styles.textNameUSer}>{emailUSer}</div>
      <div className={styles.containerBtnNavigation}>
        <CustomButtonNavigate text="Descarga Pedidos" route="/order-download" />
        <CustomButtonNavigate
          text="Gestión de pedidos"
          route="/order-management"
        />
        {typeUSer === userType.ADMIN ? (
          <CustomButtonNavigate
            text="Alta de clientes"
            route="/customer-registration"
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Menu;
