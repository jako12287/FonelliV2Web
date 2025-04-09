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
  const [allUsers, setAllUsers] = useState<DataPropsUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<DataPropsUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPerpage, setCurrentPerPage] = useState<number>(5);
  const [searchCustomer, setSearchCustomer] = useState<string>("");

  const itemsPerPage = currentPerpage;

  const fetchUsers = async () => {
    try {
      let allFetchedUsers: DataPropsUser[] = [];
      let startAfter: number | undefined = undefined;
      let hasMore = true;
  
      while (hasMore) {
        const result = await getAllUser({ limit: 100, startAfter });
  
        const filteredData = result.users.filter(
          ({ type }: DataPropsUser) => type !== userType.ADMIN
        );
  
        allFetchedUsers = [...allFetchedUsers, ...filteredData];
  
        if (result.nextPageToken !== undefined) {
          startAfter = result.nextPageToken;
        } else {
          hasMore = false;
        }
      }
  
      setAllUsers(allFetchedUsers);
      setFilteredUsers(allFetchedUsers);
    } catch (error) {
      console.error("Error al cargar los usuarios:", error);
    }
  };
  

  const handleDelete = async (_id: string) => {
    const userlocal = JSON.parse(localStorage.getItem("@USER") as string);

    if (_id === userlocal?._id) {
      return toast.error("No es posible eliminar un usuario que esté en uso", {
        duration: 5000,
      });
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

  useEffect(() => {
    const search = searchCustomer.trim().toLowerCase();
    if (search === "") {
      setFilteredUsers(allUsers);
    } else {
      const filtered = allUsers.filter((user) => {
        const customerMatch = user?.customerNumber
          ?.toString()
          .toLowerCase()
          .includes(search);
        const emailMatch = user?.email?.toLowerCase().includes(search);
        return customerMatch || emailMatch;
      });
      setFilteredUsers(filtered);
    }
    setCurrentPage(1); // Reseteamos la página cuando se busca
  }, [searchCustomer, allUsers]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentData = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerTable}>
        <TableData
          data={currentData}
          handleDelete={handleDelete}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          setCurrentPerPage={setCurrentPerPage}
          setSearchCustomer={setSearchCustomer}
        />
      </div>
    </div>
  );
};

export default CustomerRegistration;
