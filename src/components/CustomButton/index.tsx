import { FC } from "react";
import styles from "../../styles/CustomButton.module.css";
import arrowRight from "../../assets/icons/arrow.png";

interface PropsComponent {
  text: string;
}
const CustomButton: FC<PropsComponent> = ({ text }) => {
  return (
    <div className={styles.container}>
      <div className={styles.textLabelContainer}>{text}</div>
      <div className={styles.containerIcon}>
        <div className={styles.circle}>

        <img src={arrowRight} width={30} height={30} />
        </div>
      </div>
      <button className={styles.btn} />
    </div>
  );
};

export default CustomButton;
