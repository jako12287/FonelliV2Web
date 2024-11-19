import styles from "../../styles/Loading.module.css";
import Logo from "../../assets/logo/favicon.png"
const Loading = () => {
  return (
    <div className={styles.container}>
      <img src={Logo} width={50} height={50}/>
      <h3>FONELLI</h3>
     
    </div>
  );
};

export default Loading;
