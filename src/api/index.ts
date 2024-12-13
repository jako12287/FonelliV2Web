import axios from "axios";
import { RoutesApi } from "../types";
import toast from "react-hot-toast";

const BASE_URI = "https://fonellibackend.onrender.com"; //fonelli client
// const BASE_URI = 'https://fonelllibackenfirebase.onrender.com';
// const BASE_URI = "http://localhost:3000";

// type PropsRegisterUser = {
//   email: string;
//   password: string;
//   name: string;
//   type: string;
// };

type PropsCredential = {
  email: string;
  password: string;
};

type PropsChangePass = {
  _id: string;
  newPassword: string;
};

export const loginApi = async ({ email, password }: PropsCredential) => {
  try {
    const response = await axios.post(
      `${BASE_URI}${RoutesApi.LOGIN}`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.log(
      "Error al realizar login:",
      error.response?.data || error.message
    );
    return error.response?.data;
  }
};

export const changePassword = async ({ _id, newPassword }: PropsChangePass) => {
  try {
    const response = await axios.put(
      `${BASE_URI}${RoutesApi.CHANGE_PASSWORD}`,
      { _id, newPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error al cambiar contraseña:",
      error.response?.data || error.message
    );
  }
};

export const getAllUser = async () => {
  try {
    const response = await axios.get(`${BASE_URI}${RoutesApi.GET_ALL_USERS}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error en get user: ", error);
  }
};

export const getUserById = async (_id: string) => {
  try {
    const response = await axios.get(
      `${BASE_URI}${RoutesApi.GET_USER_BY_ID}/${_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error en get user by id: ", error);
  }
};

export const deleteUser = async (_id: string) => {
  try {
    const response = await axios.delete(`${BASE_URI}${RoutesApi.DELETE_USER}`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: { _id },
    });
    return response.data;
  } catch (error) {
    console.error("Error en delete user: ", error);
  }
};

export const registerMassive = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(
      `${BASE_URI}${RoutesApi.REGISTER_USER_MASSIVE}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al realizar la carga masiva:", error);
  }
};

export const registerUser = async (data: any) => {
  try {
    const response = await axios.post(
      `${BASE_URI}${RoutesApi.REGISTER_USER}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error al registrar el usuario:", error);
    toast.error(error?.response?.data?.message);
  }
};

export const editUser = async (data: any) => {
  try {
    const response = await axios.put(
      `${BASE_URI}${RoutesApi.EDIT_USER}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al editar el usuario: ", error);
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URI}${RoutesApi.GET_ALL_ORDER}`);
    return response.data.orders; // Devolver las órdenes
  } catch (error) {
    console.error("Error al obtener las órdenes:", error);
    throw new Error("No se pudieron obtener las órdenes");
  }
};

export const changeStatusAdmin = async (
  orderId: string,
  statusAdmin: string
) => {
  try {
    const response = await axios.put(
      `${BASE_URI}${RoutesApi.EDIT_STATUS_ADMIN}/${orderId}`,
      { statusAdmin }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Error al actualizar statusAdmin:",
      error.response?.data || error.message
    );
    throw new Error("No se pudo actualizar el statusAdmin.");
  }
};

export const deleteOrder = async (orderId: string) => {
  try {
    const response = await axios.delete(
      `${BASE_URI}${RoutesApi.DELETE_ORDER}/${orderId}`
    );
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Error desconocido";

    console.error("Error al eliminar la orden:", errorMessage);

    throw new Error(errorMessage);
  }
};

export const addFolio = async (orderId: string, folio: string) => {
  try {
    const response = await axios.put(
      `${BASE_URI}${RoutesApi.ADD_FOLIO}/${orderId}`,
      { folio },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Error al agregar el folio:",
      error.response?.data || error.message
    );
    throw new Error("No se pudo agregar el folio.");
  }
};

export const saveTokenToDatabase = async (userId: any, token: any) => {
  console.log(
    "uri para token notificacion",
    `${BASE_URI}${RoutesApi.TOKEN_NOTIFICATION}`
  );
  try {
    // Verificar que el token y el userId no sean vacíos
    if (!userId || !token) {
      console.error("El 'userId' y 'token' son necesarios");
      return;
    }

    // Hacer la solicitud POST al backend
    const response = await axios.post(
      `${BASE_URI}${RoutesApi.TOKEN_NOTIFICATION}`,
      {
        userId,
        token,
      }
    );

    // Respuesta exitosa
    if (response.status === 200) {
      console.log("Token guardado exitosamente:", response.data);
    } else {
      console.error("Error al guardar el token:", response.data.message);
    }
  } catch (error) {
    console.error("Error al enviar el token al backend:", error);
  }
};
