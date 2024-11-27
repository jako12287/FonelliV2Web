export interface PropsForm {
  password: string;
  email: string;
}

export interface PropsFormChangePassword {
  password: string;
  confirmPassword: string;
}

export enum StatusProps {
  CAUTGHT = "CAUTGHT",
  REQUIRED = "REQUIRED",
  DELETE = "DELETE",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  PENDING = "PENDING",
  DOWNLOAD = "DOWNLOAD",
}

export enum RoutesApi {
  LOGIN = "/login",
  STATUS = "/testbd",
  REGISTER_USER = "/register",
  REGISTER_USER_MASSIVE = "/registerMasseve",
  CHANGE_PASSWORD = "/changePassword",
  EDIT_USER = "/changeUser",
  DELETE_USER = "/deleteUser",
  GET_ALL_USERS = "/getAllUser",
}

export enum userType {
  CUSTOMER = "CUSTOMER",
  COLLABORATOR = "COLLABORATOR",
  ADMIN = "ADMIN",
}
