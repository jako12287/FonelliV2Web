import TableData from "../../components/TableDataManagement";
import styles from "../../styles/OrderDownload.module.css";
import moment from "moment";
moment.locale("es");
const OrderManagement = () => {
  const formattedDate = moment(new Date()).format("DD-MMM-YYYY").toLowerCase();

  return (
    <div className={styles.container}>
      <div className={styles.textDate}>Fecha {formattedDate}</div>
      <div className={styles.containerTable}>
        <TableData />
      </div>
    </div>
  );
};

export default OrderManagement;
