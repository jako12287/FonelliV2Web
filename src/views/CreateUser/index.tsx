// import style from "../../styles/CreateUser.module.css";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { Controller, useForm } from "react-hook-form";
// import { useNavigate, useParams } from "react-router-dom";
// import * as yup from "yup";
// import CustomButton from "../../components/CustomButton";
// import { useEffect, useState } from "react";
// import { editUser, getUserById, registerUser } from "../../api";
// import { userType } from "../../types";
// import { useDispatch } from "react-redux";
// import { setRefetch } from "../../redux/slices/refecthUser";
// import toast from "react-hot-toast";
// import Loader from "../../components/Loader";

// const schema = yup.object().shape({
//   idCustomer: yup
//     .string()
//     .required("El email es obligatorio")
//     .email("Email invalido"),
//   customerNumber: yup.string(),
//   password: yup.string().required("El password es obligatorio"),
//   type: yup.string().required("El tipo de cuenta es obligatorio"),
// });
// const CreateUser = () => {
//   const dispatch = useDispatch();
//   const navigation = useNavigate();
//   const { _id } = useParams();

//   const {
//     handleSubmit,
//     control,
//     setValue,
//     reset,
//     setError,
//     watch,
//     formState: { errors },
//   } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const handlegetUserById = async (_id: string) => {
//     try {
//       const response = await getUserById(_id);
//       if (response.id) {
//         setValue("idCustomer", response.email);
//         setValue("password", response.verify ? "" : response.password);
//         setValue("type", response.type);
//         setValue("customerNumber", response.customerNumber);
//       }
//     } catch (error) {
//       console.error("Error al cargar el usuario:", error);
//     }
//   };

//   useEffect(() => {
//     if (_id) {
//       handlegetUserById(_id);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [_id]);

//   const onSubmit = async (data: any) => {
//     const dataSend: any = {
//       type: data.type,
//       email: data.idCustomer,
//       password: data.password,
//     };

//     const dataSendEdit: any = {
//       _id,
//       type: data.type,
//       email: data.idCustomer,
//       password: data.password,
//     };

//     if (watch("type") === userType.CUSTOMER) {
//       if (!data.customerNumber) {
//         setError("customerNumber", {
//           type: "onChange",
//           message: "Ingresa el número de cliente",
//         });
//         return;
//       }
//       dataSend.customerNumber = data.customerNumber;
//       dataSendEdit.customerNumber = data.customerNumber;
//     }
//     setIsLoading(true);

//     const typeRequest = _id ? editUser(dataSendEdit) : registerUser(dataSend);
//     try {
//       const response = await typeRequest;

//       if (response?.userId) {
//         reset();
//         toast.success("Usuario creado/editado correctamente.", {
//           duration: 3000,
//         });
//         navigation("/customer-registration");
//       }
//       if (
//         response.message === "Datos del usuario actualizados correctamente."
//       ) {
//         reset();
//         toast.success("Datos del usuario actualizados correctamente.", {
//           duration: 3000,
//         });
//         navigation("/customer-registration");
//       }
//       dispatch(setRefetch(true));
//     } catch (error: any) {
//       console.log("Error al crear o editar el usuario:", error);
//       // toast.error("")
//     } finally {
//       setIsLoading(false);
//     }
//     navigation("/customer-registration");
//   };

//   return (
//     <div>
//       <div className={style.title}>
//         {_id ? "Modificar Usuario" : "Agregar usuario"}
//       </div>
//       <form onSubmit={handleSubmit(onSubmit)} className={style.containerForm}>
//         <div className={style.group}>
//           <label className={style.containerLabel} htmlFor="name">
//             Tipo de cuenta
//           </label>
//           <Controller
//             name="type"
//             control={control}
//             defaultValue={userType.COLLABORATOR}
//             render={({ field }) => (
//               <select {...field} className={style.customInput}>
//                 <option value={userType.CUSTOMER}>Cliente</option>
//                 <option value={userType.COLLABORATOR}>Colaborador</option>
//               </select>
//             )}
//           />
//         </div>
//         {watch("type") === userType.CUSTOMER && (
//           <>
//             <div className={style.group}>
//               <label className={style.containerLabel} htmlFor="name">
//                 Número de cliente
//               </label>

//               <Controller
//                 name="customerNumber"
//                 control={control}
//                 defaultValue=""
//                 render={({ field }) => (
//                   <input
//                     className={style.customInput}
//                     alt="Campo para numero de cliente"
//                     type="text"
//                     placeholder=""
//                     {...field}
//                   />
//                 )}
//               />
//             </div>
//             {errors.customerNumber && (
//               <p className={style.textError}>{errors.customerNumber.message}</p>
//             )}
//           </>
//         )}
//         <div className={style.group}>
//           <label className={style.containerLabel} htmlFor="name">
//             Correo electronico
//           </label>

//           <Controller
//             name="idCustomer"
//             control={control}
//             defaultValue=""
//             render={({ field }) => (
//               <input
//                 className={style.customInput}
//                 alt="Campo para ingresar id"
//                 type="email"
//                 placeholder=""
//                 {...field}
//               />
//             )}
//           />
//         </div>
//         {errors.idCustomer && (
//           <p className={style.textError}>{errors.idCustomer.message}</p>
//         )}
//         <div className={style.group}>
//           <label className={style.containerLabel} htmlFor="name">
//             Contraseña
//           </label>

//           <Controller
//             name="password"
//             control={control}
//             defaultValue=""
//             render={({ field }) => (
//               <input
//                 className={style.customInput}
//                 alt="Campo para ingresar tu nombre"
//                 type="text"
//                 placeholder=""
//                 {...field}
//               />
//             )}
//           />
//         </div>
//         {errors.password && (
//           <p className={style.textError}>{errors.password.message}</p>
//         )}
//         <div style={{ marginBottom: "4rem" }} />
//         {isLoading ? (
//           <Loader />
//         ) : (
//           <CustomButton text={_id ? "Modificar" : "Guardar"} />
//         )}
//       </form>
//     </div>
//   );
// };

// export default CreateUser;
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
    .email("Email inválido") // El email solo se valida si está presente
    .nullable(), // Permite valores nulos u omitidos
  customerNumber: yup.string(),
  password: yup.string().required("La contraseña es obligatoria"),
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
    setError,
    watch,
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
        setValue("customerNumber", response.customerNumber);
      }
    } catch (error) {
      console.error("Error al cargar el usuario:", error);
    }
  };

  useEffect(() => {
    if (_id) {
      handlegetUserById(_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id]);

  const onSubmit = async (data: any) => {
    const dataSend: any = {
      type: data.type,
      email: data.idCustomer || undefined, // Email opcional
      password: data.password,
    };

    const dataSendEdit: any = {
      _id,
      type: data.type,
      email: data.idCustomer || undefined, // Email opcional
      password: data.password,
    };

    if (watch("type") === userType.CUSTOMER) {
      if (!data.customerNumber) {
        setError("customerNumber", {
          type: "onChange",
          message: "Ingresa el número de cliente",
        });
        return;
      }
      dataSend.customerNumber = data.customerNumber;
      dataSendEdit.customerNumber = data.customerNumber;
    }
    setIsLoading(true);

    const typeRequest = _id ? editUser(dataSendEdit) : registerUser(dataSend);
    try {
      const response = await typeRequest;

      if (response?.userId) {
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
    } catch (error: any) {
      console.log("Error al crear o editar el usuario:", error);
    } finally {
      setIsLoading(false);
    }
    navigation("/customer-registration");
  };

  return (
    <div>
      <div className={style.title}>
        {_id ? "Modificar Usuario" : "Agregar usuario"}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={style.containerForm}>
        <div className={style.group}>
          <label className={style.containerLabel} htmlFor="name">
            Tipo de cuenta
          </label>
          <Controller
            name="type"
            control={control}
            defaultValue={userType.COLLABORATOR}
            render={({ field }) => (
              <select {...field} className={style.customInput}>
                <option value={userType.CUSTOMER}>Cliente</option>
                <option value={userType.COLLABORATOR}>Colaborador</option>
              </select>
            )}
          />
        </div>
        {watch("type") === userType.CUSTOMER && (
          <>
            <div className={style.group}>
              <label className={style.containerLabel} htmlFor="name">
                Número de cliente
              </label>
              <Controller
                name="customerNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    className={style.customInput}
                    alt="Campo para numero de cliente"
                    type="text"
                    {...field}
                  />
                )}
              />
            </div>
            {errors.customerNumber && (
              <p className={style.textError}>{errors.customerNumber.message}</p>
            )}
          </>
        )}
        <div className={style.group}>
          <label className={style.containerLabel} htmlFor="idCustomer">
            Correo electrónico <span>(opcional)</span>
          </label>
          <Controller
            name="idCustomer"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                className={style.customInput}
                type="email"
                placeholder="Ingrese un correo válido si lo desea"
                {...field}
                value={field.value || ""}
              />
            )}
          />
        </div>
        {errors.idCustomer && (
          <p className={style.textError}>{errors.idCustomer.message}</p>
        )}
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
                type="text"
                placeholder="Ingrese la contraseña"
                {...field}
              />
            )}
          />
        </div>
        {errors.password && (
          <p className={style.textError}>{errors.password.message}</p>
        )}
        <div style={{ marginBottom: "4rem" }} />
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
