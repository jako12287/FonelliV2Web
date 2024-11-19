import style from "../../styles/Login.module.css";
import Logo from "../../assets/images/logoLogin.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { PropsForm } from "../../types";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("El email no es válido")
    .required("El email es obligatorio"),
  password: yup.string().required("El nombre es obligatorio"),
});
const Login = () => {
  const navigation = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<PropsForm> = (data) => {
    
    console.log(data);
    navigation("/home");
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
                  type="text"
                  placeholder="Escribe tu nombre completo"
                  {...field}
                />
              )}
            />
          </div>
          {errors.password && (
            <p className={style.textError}>{errors.password.message}</p>
          )}

          <CustomButton text="Ingresar" />
        </form>
      </div>
    </section>
  );
};

export default Login;
