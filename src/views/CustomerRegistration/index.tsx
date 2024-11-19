import styles from "../../styles/TableDataCustomerRegistration.module.css"
import TableData from "../../components/TableDataCustomerRegistration";

const CustomerRegistration = () => {
  return (
    <div className={styles.container}>
      <div>
        <TableData />
      </div>
    </div>
  );
};

export default CustomerRegistration;
