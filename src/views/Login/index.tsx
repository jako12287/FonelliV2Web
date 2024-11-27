import style from "../../styles/Login.module.css";
import Logo from "../../assets/images/logoLogin.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { PropsForm, userType } from "../../types";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../../components/Loader";
import { loginApi } from "../../api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authReducer";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("El email no es válido")
    .required("El email es obligatorio"),
  password: yup.string().required("El nombre es obligatorio"),
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

  const onSubmit: SubmitHandler<PropsForm> = async (data) => {
    setIsLoading(true);
    const dataSend = {
      email: data.email.toLowerCase(),
      password: data.password,
    };
    try {
      const result = await loginApi(dataSend);
      console.log("resulktado login", result.user.type)

      if (
        result?.message === "Revisa las credenciales." ||
        result?.message === "Contraseña incorrecta."
      ) {
        toast("Revisa las credenciales");
        return;
      }

      if (result?.user?.type === userType.CUSTOMER) {
      console.log("ENTRO AL IF")

        toast(
          "Tu cuenta no tiene acceso. Si crees que esto es un error, por favor contacta a soporte"
        );
        return;
      }
      if (result?.token) {
        dispatch(login(result) as never);
        if (!result?.user?.verify && result?.user?._id) {
          reset();
          navigation(`/changePassword/${result?.user?._id}`);
          return;
        }
        navigation("/home");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
    // navigation("/home");
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
                  alt="Campo para ingresar tu nombre"
                  type="text"
                  placeholder="Escribe tu nombre completo"
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
                  placeholder="Escribe tu nombre completo"
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
