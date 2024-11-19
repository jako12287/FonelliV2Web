import styles from "../../styles/Nav.module.css";
import bell from "../../assets/icons/bell.png";
import bellActive from "../../assets/icons/bellActive.png";
import HomeIcon from "../../assets/icons/home.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Notification = () => {
  const navigation = useNavigate()
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <nav className={styles.container}>
      <div className={styles.containerImageHome} onClick={()=>navigation("/home")}>
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
    </nav>
  );
};

export default Notification;
