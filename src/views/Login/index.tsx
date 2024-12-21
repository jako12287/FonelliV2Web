import { useState } from "react";
import style from "../../styles/Login.module.css";
import Logo from "../../assets/images/logoLogin.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { PropsForm, userType } from "../../types";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import {
  loginApi,
  // saveTokenToDatabase
} from "../../api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authReducer";
import { requestPermission } from "../../api/firebaseConfig";
// import NotificationService from "../../api/NotificationService";
// import { getMessaging, getToken } from "firebase/messaging"; // Importa FCM

const schema = yup.object().shape({
  email: yup
    .string()
    .email("El email no es válido")
    .required("El email es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria"),
});

const Login = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Función para obtener el token de FCM
  // const getFCMToken = async (userId: any) => {
  //   try {
  //     // Solicitar permiso para notificaciones
  //     const permission = await Notification.requestPermission();

  //     if (permission === "granted") {
  //       const messaging = getMessaging();
  //       try {
  //         const currentToken = await getToken(messaging, {
  //           vapidKey: "BDScco0DXtm8g8J5fL3d53YTWWPKH5WkWa6Df5GGXq4YmVZj_OPAGrnt_6fqnX1gOMV3sMs--25ctPIOX4n__sQ"
  //         });
  //         console.log("Token de FCM:", currentToken);
  //         if (currentToken) {
  //           saveTokenToDatabase(userId, currentToken);
  //         } else {
  //           console.log("No se pudo obtener el token.");
  //         }
  //       } catch (error) {
  //         console.error("Error al obtener el token:", error);
  //       }
  //     } else {
  //       console.log("Permiso denegado para recibir notificaciones");
  //     }
  //   } catch (error) {
  //     console.error("Error al solicitar permiso para notificaciones:", error);
  //   }
  // };

  // Función para guardar el token en la base de datos
  const onSubmit: SubmitHandler<PropsForm> = async (data) => {
    localStorage.clear();
    setIsLoading(true);
    const dataSend = {
      email: data.email.toLowerCase(),
      password: data.password,
    };
    try {
      const result = await loginApi(dataSend);

      if (
        result.message === "Revisa las credenciales." ||
        result.message === "Contraseña incorrecta."
      ) {
        toast.error("Revisa las credenciales", { duration: 5000 });
        return;
      }

      if (result?.user?.type === userType.CUSTOMER) {
        toast.error(
          "Tu cuenta no tiene acceso. Si crees que esto es un error, por favor contacta a soporte",
          { duration: 5000 }
        );
        return;
      }
      if (result?.token) {
        dispatch(login(result) as never);
        if (!result?.user?.verify && result?.user?._id && result?.user?.changePass === 0) {
          reset();
          navigation(`/changePassword/${result?.user?._id}`);
          return;
        }
        console.log("antes de permiso")
        await requestPermission(result?.user?._id);
        console.log("despues de permiso")
        // NotificationService.requestPermission()
        // Llamar a la función para obtener el token de FCM
        // getFCMToken(result?.user?._id);
        navigation("/home");
      }
    } catch (error) {
      console.log("error", error);
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
          <div className={style.group}>
            <label className={style.containerLabel} htmlFor="name">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  className={style.customInput}
                  alt="Campo para ingresar tu email"
                  type="text"
                  placeholder="Escribe tu email"
                  {...field}
                />
              )}
            />
          </div>
          <div className={style.containerTextError}>
            {errors.email && (
              <p className={style.textError}>{errors.email.message}</p>
            )}
          </div>

          <div className={style.group}>
            <label className={style.containerLabel} htmlFor="password">
              Contraseña
            </label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  className={style.customInput}
                  alt="Campo para ingresar tu contraseña"
                  type="password"
                  placeholder="Escribe tu contraseña"
                  {...field}
                />
              )}
            />
          </div>
          {errors.password && (
            <p className={style.textError}>{errors.password.message}</p>
          )}

          {isLoading ? <Loader /> : <CustomButton text="Ingresar" />}
        </form>
      </div>
    </section>
  );
};

export default Login;
