import axios from "axios";
import { RoutesApi } from "../types";

// const BASE_URI = 'https://fonelllibackenfirebase.onrender.com';
const BASE_URI = "http://localhost:3000";

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
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
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
