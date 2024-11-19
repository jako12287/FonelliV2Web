import { FC } from "react";
import styles from "../../styles/CustomButtonNavigate.module.css";
import arrowRight from "../../assets/icons/arrow.png";
import { useNavigate } from "react-router-dom";

interface PropsComponent {
  text: string;
  route: string;
}
const CustomButtonNavigate: FC<PropsComponent> = ({ text, route }) => {
  const navigation = useNavigate();
  return (
    <div className={styles.container} onClick={() => navigation(route)}>
      <div className={styles.textLabelContainer}>{text}</div>
      <div className={styles.containerIcon}>
        <div className={styles.circle}>
          <img src={arrowRight} width={20} height={20} />
        </div>
      </div>
    </div>
  );
};

export default CustomButtonNavigate;
