import style from "../../styles/CreateUser.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import CustomButton from "../../components/CustomButton";

const schema = yup.object().shape({
  idCustomer: yup
    .string()
    .required("El id es obligatorio"),
  password: yup.string().required("El password es obligatorio"),
});
const CreateUser = () => {
  const navigation = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    console.log(data);
    navigation("/customer-registration");
  };

  return (
    <div>
      <div className={style.title}>Agregar usuario</div>
      <form onSubmit={handleSubmit(onSubmit)} className={style.containerForm}>
        <div className={style.group}>
          <label className={style.containerLabel} htmlFor="name">
          ID de cliente o correo colaborador
          </label>

          <Controller
            name="idCustomer"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                className={style.customInput}
                alt="Campo para ingresar id"
                type="text"
                placeholder=""
                {...field}
              />
            )}
          />
        </div>
        {errors.idCustomer && (
          <p className={style.textError}>{errors.idCustomer.message}</p>
        )}
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
                placeholder=""
                {...field}
              />
            )}
          />
        </div>
        {errors.password && (
          <p className={style.textError}>{errors.password.message}</p>
        )}
        <div className={style.group} style={{marginBottom:"4rem"}}>
          <label className={style.containerLabel} htmlFor="name">
          Tipo de cuenta
          </label>
          <select className={style.customInput}>
            <option value="cliente">Cliente</option>
            <option value="colaborador">Colaborador</option>
          </select>

          
        </div>
        <CustomButton text="Guardar" />
      </form>
    </div>
  );
};

export default CreateUser;
