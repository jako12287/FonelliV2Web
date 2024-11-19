import TableData from "../../components/TableDataDownload";
import styles from "../../styles/OrderDownload.module.css";
import moment from "moment";
moment.locale("es");

const OrderDownload = () => {
  const formattedDate = moment(new Date()).format("DD-MMM-YYYY").toLowerCase();
  return (
    <div className={styles.container}>
      <div className={styles.textDate}>Fecha {formattedDate}</div>
      <div>
        <TableData />
      </div>
    </div>
  );
};

export default OrderDownload;
