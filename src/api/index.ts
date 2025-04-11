import axios from "axios";
import { RoutesApi } from "../types";
import toast from "react-hot-toast";

const BASE_URI = "https://fonellibackend.onrender.com";
//fonelli client
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

interface GetAllUserParams {
  limit?: number;
  startAfter?: number;
}

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
    console.log("Error al realizar login 2:", error.response?.data?.message);
    if (error.response?.data?.message === "Ya tienes una sesión activa.") {
      return toast.error(error.response?.data?.message);
    }
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



export const getAllUser = async ({
  limit = 100,
  startAfter,
}: GetAllUserParams = {}) => {
  try {
    const queryParams = new URLSearchParams();

    if (limit) queryParams.append("limit", String(limit));
    if (startAfter !== undefined)
      queryParams.append("startAfter", String(startAfter));

    const token = localStorage.getItem("@TOKEN");

    const response = await axios.get(
      `${BASE_URI}${RoutesApi.GET_ALL_USERS}?${queryParams.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      users: response.data?.users || [],
      nextPageToken: response.data?.nextPageToken,
    };
  } catch (error: any) {
    console.error("Error en get user: ", error);

    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login"; // Redirige al login
    }

    return { users: [] };
  }
};


export const getUserById = async (_id: string) => {
  try {
    const token = localStorage.getItem("@TOKEN");

    const response = await axios.get(
      `${BASE_URI}${RoutesApi.GET_USER_BY_ID}/${_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
    const token = localStorage.getItem("@TOKEN");
    const response = await axios.delete(`${BASE_URI}${RoutesApi.DELETE_USER}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
    const token = localStorage.getItem("@TOKEN");

    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(
      `${BASE_URI}${RoutesApi.REGISTER_USER_MASSIVE}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
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
    const token = localStorage.getItem('@TOKEN')
    const response = await axios.post(
      `${BASE_URI}${RoutesApi.REGISTER_USER}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`
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
    const token = localStorage.getItem('@TOKEN')
    const response = await axios.put(
      `${BASE_URI}${RoutesApi.EDIT_USER}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
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
    const token = localStorage.getItem("@TOKEN");
    const response = await axios.get(`${BASE_URI}${RoutesApi.GET_ALL_ORDER}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data.orders;
  } catch (error: any) {
    console.error("Error al obtener las órdenes:", error);

    if (error?.response?.status === 401) {
      // Limpiar cualquier posible sesión local
      localStorage.clear();
      // Redirigir al login
      window.location.href = "/login";
      return;
    }

    throw new Error("No se pudieron obtener las órdenes");
  }
};



export const changeStatusAdmin = async (
  orderId: string,
  statusAdmin: string
) => {
  try {
    const token = localStorage.getItem("@TOKEN");

    const response = await axios.put(
      `${BASE_URI}${RoutesApi.EDIT_STATUS_ADMIN}/${orderId}`,
      { statusAdmin },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
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
    const token = localStorage.getItem("@TOKEN");

    const response = await axios.delete(
      `${BASE_URI}${RoutesApi.DELETE_ORDER}/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
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
    const token = localStorage.getItem("@TOKEN");

    const response = await axios.put(
      `${BASE_URI}${RoutesApi.ADD_FOLIO}/${orderId}`,
      { folio },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
      console.log("Token guardado exitosamente:");
    } else {
      console.error("Error al guardar el token:", response.data.message);
    }
  } catch (error) {
    console.error("Error al enviar el token al backend:", error);
  }
};

export const LogoutAll = async (userId: string) => {
  try {
    const response = await axios.post(`${BASE_URI}${RoutesApi.LOGOUT}`, {
      userId,
    });
    if (response.status === 200) {
      console.log("Session cerrada exitosamente");
    } else {
      console.error("Error al cerrar session:", response.data.message);
    }
  } catch (error) {
    console.error("Error al cerrar session:", error);
  }
};

export const getAllNotify = async () => {
  try {
    const response = await axios.get(
      `${BASE_URI}${RoutesApi.GET_NOTIFICATIONS}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.notifications;
  } catch (error) {
    console.log("Error en get notifications: ", error);
  }
};

export const deleteNotification = async (notificationId: string) => {
  try {
    const response = await axios.delete(
      `${BASE_URI}${RoutesApi.DELETE_NOTIFICATION}/${notificationId}`
    );
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Error desconocido";

    console.error("Error al eliminar la notificacion:", errorMessage);

    throw new Error(errorMessage);
  }
};

export const verifyPassword = async (id: string, password: string) => {
  if (!id || !password) {
    console.error("El 'id' y 'password' son necesarios");
    return;
  }

  try {
    const token = localStorage.getItem("@TOKEN");

    const response = await axios.post(
      `${BASE_URI}${RoutesApi.VERIFY_PASSWORD}`,
      {
        id,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      toast.error(error?.response?.data?.message);
    } else {
      console.error("Error en verifyPassword:", error);
    }
  }
};

