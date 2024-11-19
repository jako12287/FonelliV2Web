import { FC } from "react";
import styles from "../../styles/CustomButtonNavigate.module.css";
import arrowRight from "../../assets/icons/arrow.png";
import { useNavigate } from "react-router-dom";

interface PropsComponent {
  text: string;
  route: string;
  type?: string;
}
const CustomButtonNavigate: FC<PropsComponent> = ({ text, route, type = "default" }) => {
  const navigation = useNavigate();
  return (
    <div className={type === "default" ? styles.container : styles.containerEspecial} onClick={() => navigation(route)}>
      <div className={type === "default" ? styles.textLabelContainer : styles.textLabelContainerSpecial}>{text}</div>
      <div className={styles.containerIcon}>
        <div className={styles.circle}>
          <img src={arrowRight} width={20} height={20} />
        </div>
      </div>
    </div>
  );
};

export default CustomButtonNavigate;
