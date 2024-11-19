import styles from "../../styles/Home.module.css"
import ImageHome from "../../assets/images/imageHome.png"

const Home = () => {
    return <div className={styles.container}>
      <div className={styles.containerImage}>

      <img src={ImageHome} className={styles.image}/>
      </div>
      </div>;
  };
  
  
  export default Home;