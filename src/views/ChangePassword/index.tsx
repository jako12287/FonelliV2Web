import style from "../../styles/Login.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { PropsFormChangePassword } from "../../types";
import { changePassword } from "../../api";
import toast from "react-hot-toast";
import Logo from "../../assets/images/logoLogin.png";
import Loader from "../../components/Loader";
import CustomButton from "../../components/CustomButton";

const schema = yup.object().shape({
    password: yup
    .string()
    .required('Ingresa la contraseña')
    .min(7, 'Al menos 7 caracteres'),
  confirmPassword: yup
    .string()
    .required('Confirma tu contraseña')
    .oneOf([yup.ref('password')], 'Contraseñas no coinciden'),
});

const ChangePassword = () => {
  const navigation = useNavigate();
  const { _id } = useParams();

  if (!_id) {
    return <div>No found</div>;
  }
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<PropsFormChangePassword> = async (data) => {
    setIsLoading(true);
    const dataSend = {
      _id,
      newPassword: data.password,
    };

    try {
      const result = await changePassword(dataSend);

      if (result?.message === "Contraseña actualizada correctamente.") {
        reset();
        navigation("/home");
      } else {
        toast(result?.message || "Error desconocido. Intenta nuevamente.");
      }
      return;
    } catch (error) {
      toast(
        "Error en el inicio de sesión Por favor, verifica tus credenciales o inténtalo nuevamente"
      );
      console.error("Error on login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={style.container}>
      <div className={style.sectionLogo}>
        <img src={Logo} className={style.image} />
      </div>
      <div className={style.sectionForm}>
        <form onSubmit={handleSubmit(onSubmit)} className={style.containerForm}>
        <p className={style.textChange}>Por tu seguridad, debes hacer el cambio de tu contraseña</p>
          <div className={style.group}>
            <label className={style.containerLabel} htmlFor="name">
            Contraseña
            </label>

            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  className={style.customInput}
                  alt="Campo para ingresar tu nombre"
                  type="password"
                  placeholder=""
                  {...field}
                />
              )}
            />
          </div>
          <div className={style.containerTextError}>
            {errors.password && (
              <p className={style.textError}>{errors.password.message}</p>
            )}
          </div>

          <div className={style.group}>
            <label className={style.containerLabel} htmlFor="name">
              Contraseña
            </label>

            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  className={style.customInput}
                  alt="Campo para ingresar tu password"
                  type="password"
                  placeholder=""
                  {...field}
                />
              )}
            />
          </div>
          {errors.confirmPassword && (
            <p className={style.textError}>{errors.confirmPassword.message}</p>
          )}

          {isLoading ? <Loader /> : <CustomButton text="Enviar" />}
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
