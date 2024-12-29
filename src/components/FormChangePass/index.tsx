import { FC, useState } from "react";
import styles from "../../styles/MiniModal.module.css";
import { changePassword, verifyPassword } from "../../api";
import toast from "react-hot-toast";
import { userType } from "../../types";

interface Props {
  setShowModalChangePass: any;
}
const FormChangePass: FC<Props> = ({ setShowModalChangePass }) => {
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<{
    active: boolean;
    message: string;
  }>({
    active: false,
    message: "",
  });
  const [showForm, setShowForm] = useState<any>({
    current: true,
    change: false,
  });

  const onsubmit = async (e: any) => {
    e.preventDefault();
    try {
      const _idUser = JSON.parse(localStorage.getItem("@USER") as never)?._id;
      const typeUser = JSON.parse(localStorage.getItem("@USER") as never)?.type;

      if (typeUser !== userType.ADMIN) {
        setShowModalChangePass(false);
        toast.error("No tienes permisos para cambiar la contraseña");
        return;
      }

      if (showForm.current) {
        const response = await verifyPassword(_idUser, password);
        if (response?.status === 200) {
          setShowForm({
            current: false,
            change: true,
          });
        }
      }

      if (showForm.change) {
        if (newPassword !== confirmNewPassword) {
          setErrorMessage({
            active: true,
            message: "Las contraseñas no coinciden",
          });
        }

        const response = await changePassword({ _id: _idUser, newPassword });
        if (response) {
          toast.success("Contraseña cambiada con exito");
        }
        setErrorMessage({
          active: false,
          message: "",
        });
        setShowModalChangePass(false);
      }
    } catch (error) {
      console.log("error al cambiar la contraseña Adim", error);
    }
  };

  const onChangePass = (e: any) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const onChangeNewPass = (e: any) => {
    e.preventDefault();
    if (e.target.name === "newPassword") {
      setNewPassword(e.target.value);
    }

    if (e.target.name === "confirmPassword") {
      setConfirmNewPassword(e.target.value);
    }
  };

  if (showForm.current) {
    return (
      <form className={styles.formChangePass} onSubmit={onsubmit}>
        <label>Ingresa la clave actual</label>
        <input
          type="password"
          placeholder="Clave actual"
          onChange={onChangePass}
          value={password}
        />
        <button disabled={password === ""}>Enviar</button>
      </form>
    );
  } else if (showForm.change) {
    return (
      <form className={styles.formChangePass} onSubmit={onsubmit}>
        <label>Ingresa la nueva clave</label>
        <input
          type="password"
          placeholder="Nueva clave"
          onChange={onChangeNewPass}
          name="newPassword"
          value={newPassword}
        />

        <input
          type="password"
          placeholder="Repite la clave"
          onChange={onChangeNewPass}
          name="confirmPassword"
          value={confirmNewPassword}
        />
        {errorMessage.active && <h4>{errorMessage.message}</h4>}
        <button disabled={newPassword !== confirmNewPassword}>Enviar</button>
      </form>
    );
  }
};

export default FormChangePass;
