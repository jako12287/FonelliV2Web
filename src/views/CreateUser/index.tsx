import style from "../../styles/CreateUser.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import CustomButton from "../../components/CustomButton";
import { useEffect, useState } from "react";
import { editUser, getUserById, registerUser } from "../../api";
import { userType } from "../../types";
import { useDispatch } from "react-redux";
import { setRefetch } from "../../redux/slices/refecthUser";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

const schema = yup.object().shape({
  idCustomer: yup
    .string()
    .required("El email es obligatorio")
    .email("Email invalido"),
  password: yup.string().required("El password es obligatorio"),
  type: yup.string().required("El tipo de cuenta es obligatorio"),
});
const CreateUser = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { _id } = useParams();

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlegetUserById = async (_id: string) => {
    try {
      const response = await getUserById(_id);
      if (response.id) {
        setValue("idCustomer", response.email);
        setValue("password", response.verify ? "" : response.password);
        setValue("type", response.type);
      }
    } catch (error) {
      console.error("Error al cargar el usuario:", error);
    }
  };

  useEffect(() => {
    if (_id) {
      handlegetUserById(_id);
    }
  }, [_id]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const dataSend = {
      email: data.idCustomer,
      password: data.password,
      type: data.type,
    };

    const dataSendEdit = {
      _id,
      email: data.idCustomer,
      password: data.password,
      type: data.type,
    };

    const typeRequest = _id ? editUser(dataSendEdit) : registerUser(dataSend);
    try {
      const response = await typeRequest;

      if (response.userId) {
        reset();
        toast.success("Usuario creado/editado correctamente.", {
          duration: 3000,
        });
        navigation("/customer-registration");
      }
      if (
        response.message === "Datos del usuario actualizados correctamente."
      ) {
        reset();
        toast.success("Datos del usuario actualizados correctamente.", {
          duration: 3000,
        });
        navigation("/customer-registration");
      }
      dispatch(setRefetch(true));
    } catch (error) {
      console.error("Error al crear o editar el usuario:", error);
    } finally {
      setIsLoading(false);
    }
    // navigation("/customer-registration");
  };

  return (
    <div>
      <div className={style.title}>
        {_id ? "Modificar Usuario" : "Agregar usuario"}
      </div>
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
        <div className={style.group} style={{ marginBottom: "4rem" }}>
          <label className={style.containerLabel} htmlFor="name">
            Tipo de cuenta
          </label>
          <Controller
            name="type"
            control={control}
            defaultValue={userType.CUSTOMER}
            render={({ field }) => (
              <select {...field} className={style.customInput}>
                <option value={userType.CUSTOMER}>Cliente</option>
                <option value={userType.COLLABORATOR}>Colaborador</option>
              </select>
            )}
          />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <CustomButton text={_id ? "Modificar" : "Guardar"} />
        )}
      </form>
    </div>
  );
};

export default CreateUser;
