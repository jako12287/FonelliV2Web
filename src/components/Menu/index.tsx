import styles from "../../styles/Menu.module.css";
import ImageFake from "../../assets/images/perfilfakeimage.png";
import CustomButtonNavigate from "../CustomButtonNavigate";

const Menu = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerImage}>
        <img src={ImageFake} className={styles.image} />
      </div>
      <div className={styles.textNameUSer}>Andrea Valeria Pérez</div>
      <div className={styles.containerBtnNavigation}>
        <CustomButtonNavigate text="Descarga Pedidos" route="/order-download" />
        <CustomButtonNavigate
          text="Gestión de pedidos"
          route="/order-management"
        />
        <CustomButtonNavigate
          text="Alta de clientes"
          route="/customer-registration"
        />
      </div>
    </div>
  );
};

export default Menu;
