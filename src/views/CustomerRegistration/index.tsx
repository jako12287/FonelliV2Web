import styles from "../../styles/TableDataCustomerRegistration.module.css";
import TableData from "../../components/TableDataCustomerRegistration";
import { deleteUser, getAllUser } from "../../api";
import { useEffect, useState } from "react";
import { DataPropsUser, userType } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setRefetch } from "../../redux/slices/refecthUser";
import toast from "react-hot-toast";

const CustomerRegistration = () => {
  const dispatch = useDispatch();
  const refetch = useSelector((state: RootState) => state.refetchUser.refetch);
  const [dataUser, setDataUser] = useState<DataPropsUser[]>([]);

  const fetchUsers = async () => {
    try {
      const result = await getAllUser();
      const filteredData = result.filter(
        ({ type }: DataPropsUser) => type !== userType.ADMIN
      );
      setDataUser(filteredData);
    } catch (error) {
      console.error("Error al cargar los usuarios:", error);
    }
  };

  const handleDelete = async (_id: string) => {
    const userlocal = JSON.parse(localStorage.getItem('@USER') as string)

    if(_id === userlocal?._id){
      return toast.error("No es posible eliminar un usuario que esté en uso",{
        duration:5000
      })
    }
    try {
      const isConfirmed = window.confirm(
        "¿Estás seguro de que deseas eliminar este usuario?"
      );
      if (!isConfirmed) return;

      await deleteUser(_id);
      alert("Usuario eliminado con éxito");

      fetchUsers();
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      alert("Hubo un problema al intentar eliminar el usuario.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (refetch) {
      fetchUsers();
      dispatch(setRefetch(false));
    }
  }, [refetch]);

  return (
    <div className={styles.container}>
      <div className={styles.containerTable}>
        <TableData data={dataUser} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default CustomerRegistration;
