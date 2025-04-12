import styles from "../../styles/Nav.module.css";
import stylesModal from "../../styles/MiniModal.module.css";
import bell from "../../assets/icons/bell.png";
import bellActive from "../../assets/icons/bellActive.png";
import HomeIcon from "../../assets/icons/home.png";
import XlsIcon from "../../assets/icons/xls.png";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomButtonNavigate from "../CustomButtonNavigate";
import { CustomAlertLogOut } from "../../utils/customAlert";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authReducer";
import { getAllNotify, registerMassive } from "../../api";
import { setRefetch } from "../../redux/slices/refecthUser";
import toast from "react-hot-toast";
import { setOpen } from "../../redux/slices/openModalNotify";
import { RootState } from "../../redux/store";
import FormChangePass from "../FormChangePass";
import Loader from "../Loader";

const Notification = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const refetchRealTime = useSelector(
    (state: RootState) => state.refetchRealTime.refetch
  );
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [showModalChangePass, setShowModalChangePass] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isData, setData] = useState(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Manejo de logout
  const handleLogout = async () => {
    CustomAlertLogOut(dispatch, logout, navigation);
  };

  // Manejo de cambio de archivo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  // Subida masiva de archivo
  const handleUpload = async () => {
    if (!file) {
      alert("Por favor, selecciona un archivo antes de subirlo.");
      return;
    }

    setIsUploading(true);

    try {
      const response = await registerMassive(file);
      if (response?.errors) {
        response.errors.forEach((error: { email: string; message: string }) =>
          toast.error(`Email: ${error.email} - ${error.message}`, {
            duration: 5000,
          })
        );
      }

      toast.success("Carga masiva realizada con éxito.", { duration: 5000 });
      dispatch(setRefetch(true));
      setShowModal(false);
      setFile(null);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      alert("Hubo un error al intentar cargar los usuarios.");
    } finally {
      setIsUploading(false);
    }
  };

  // Abrir modal de notificaciones
  const handleOpenModal = () => {
    dispatch(setOpen(true));
  };

  // Obtener todas las notificaciones
  const getAll = async () => {
    try {
      const response = await getAllNotify();
      setData(response.length > 0);
    } catch (error) {
      console.log("Error al traer las notificaciones:", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    if (refetchRealTime) {
      getAll();
      dispatch(setRefetch(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchRealTime]);

  return (
    <nav className={styles.container}>
      <div
        className={styles.textLogout}
        onClick={() => setShowModalChangePass(true)}
      >
        Cambio de clave
      </div>
      <div className={styles.textLogout} onClick={handleLogout}>
        Cerrar sesión
      </div>
      {location.pathname === "/customer-registration" && (
        <div className={styles.containerBtnUser}>
          <CustomButtonNavigate
            route="/create-user"
            text="Agregar Usuario"
            type="special"
          />
        </div>
      )}
      <div
        className={styles.containerImageHome}
        onClick={() => navigation("/home")}
      >
        <img src={HomeIcon} className={styles.image} />
      </div>
      <div className={styles.containerImage} onClick={handleOpenModal}>
        <img src={isData ? bellActive : bell} className={styles.image} />
      </div>
      {location.pathname === "/customer-registration" && (
        <div
          className={styles.containerImageHome}
          onClick={() => setShowModal(true)}
        >
          <img src={XlsIcon} className={styles.image} />
        </div>
      )}

      {showModal && (
        <div className={stylesModal.modalOverlay}>
          <div className={stylesModal.modal}>
            <h3>Cargar Usuarios</h3>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className={stylesModal.inputFile}
            />
            <div className={stylesModal.modalActions}>
              <button
                onClick={handleUpload}
                className={stylesModal.uploadButton}
                disabled={isUploading}
              >
                {isUploading ? "Subiendo..." : "Subir"}
              </button>
              {isUploading && <Loader text="No cierre el modal o se interrumpirá la carga."/>}
              <button
                onClick={() => setShowModal(false)}
                className={stylesModal.cancelButton}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {showModalChangePass && (
        <div className={stylesModal.modalOverlay}>
          <div className={stylesModal.modal}>
            <h3>Cambio de clave para usuario administrador</h3>
            <FormChangePass setShowModalChangePass={setShowModalChangePass} />
            <div className={stylesModal.modalActions}>
              <button
                className={stylesModal.cancelButton}
                onClick={() => setShowModalChangePass(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Notification;
