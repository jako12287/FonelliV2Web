import styles from "../../styles/Nav.module.css";
import stylesModal from "../../styles/MiniModal.module.css";
import bell from "../../assets/icons/bell.png";
import bellActive from "../../assets/icons/bellActive.png";
import HomeIcon from "../../assets/icons/home.png";
import XlsIcon from "../../assets/icons/xls.png";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomButtonNavigate from "../CustomButtonNavigate";
import { CustomAlertLogOut } from "../../utils/customAlert";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authReducer";
import { registerMassive } from "../../api";
import { setRefetch } from "../../redux/slices/refecthUser";
import toast from "react-hot-toast";
const Notification = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const handleLogout = () => {
    CustomAlertLogOut(dispatch, logout, navigation);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleErrors = (errors: { email: string; message: string }[]) => {
    errors.forEach((error) => {
      toast.error(`Email: ${error.email} - ${error.message}`, {
        duration: 15000,
      });
    });
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Por favor, selecciona un archivo antes de subirlo.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Aquí puedes llamar a tu servicio para cargar el archivo
      const response = await registerMassive(file);
      if (response?.errors) {
        handleErrors(response.errors);
      }

      toast.success("Carga masiva realizada con éxito.", { duration: 5000 });
      dispatch(setRefetch(true));
      setShowModal(false); // Cerrar el modal después de la carga
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      alert("Hubo un error al intentar cargar los usuarios.");
    }
  };

  return (
    <nav className={styles.container}>
      <div className={styles.textLogout} onClick={handleLogout}>
        Cerrar sesión
      </div>
      {location.pathname === "/customer-registration" ? (
        <div className={styles.containerBtnUser}>
          <CustomButtonNavigate
            route="/create-user"
            text="Agregar Usuario"
            type="special"
          />
        </div>
      ) : null}
      <div
        className={styles.containerImageHome}
        onClick={() => navigation("/home")}
      >
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
      {location.pathname === "/customer-registration" ? (
        <div
          className={styles.containerImageHome}
          onClick={() => setShowModal(true)}
        >
          <img src={XlsIcon} className={styles.image} />
        </div>
      ) : null}

      {showModal && (
        <div className={stylesModal.modalOverlay}>
          <div className={stylesModal.modal}>
            <h3>Cargar Usuarios</h3>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
            />
            <div className={stylesModal.modalActions}>
              <button
                onClick={handleUpload}
                className={stylesModal.uploadButton}
              >
                Subir
              </button>
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
    </nav>
  );
};

export default Notification;
