// import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
// import { lazy } from "react";
// import Layout from "../layout";
// // eslint-disable-next-line react-refresh/only-export-components
// const Login = lazy(() => import("../views/Login"));
// const ChangePassword = lazy(() => import("../views/ChangePassword"));
// const Home = lazy(() => import("../views/Home"));
// const OrderDownload = lazy(() => import("../views/OrderDownload"));
// const OrderManagement = lazy(() => import("../views/OrderManagement"));
// const CreateUser = lazy(() => import("../views/CreateUser"));
// const CustomerRegistration = lazy(
//   () => import("../views/CustomerRegistration")
// );
// const NotFound = lazy(() => import("../views/NoFound"));

// // eslint-disable-next-line react-refresh/only-export-components

// const Router: RouteObject[] = [
//   {
//     id: "redirect-to-login",
//     path: "/", // Ruta raíz
//     element: <Navigate to="/login" replace />, // Redirige a /login
//   },
//   {
//     id: "login",
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     id: "changePassword",
//     path: "/changePassword/:_id",
//     element: <ChangePassword />,
//   },
//   {
//     id: "home",
//     path: "/home",
//     element: (
//       <Layout>
//         <Home />
//       </Layout>
//     ),
//   },
//   {
//     id: "order-download",
//     path: "/order-download",
//     element: (
//       <Layout>
//         <OrderDownload />
//       </Layout>
//     ),
//   },
//   {
//     id: "order-management",
//     path: "/order-management",
//     element: (
//       <Layout>
//         <OrderManagement />
//       </Layout>
//     ),
//   },
//   {
//     id: "customer-registration",
//     path: "/customer-registration",
//     element: (
//       <Layout>
//         <CustomerRegistration />
//       </Layout>
//     ),
//   },
//   {
//     id: "create-user",
//     path: "/create-user",
//     element: (
//       <Layout>
//         <CreateUser />
//       </Layout>
//     ),
//   },
//   {
//     id: "edit-user",
//     path: "/edit-user/:_id",
//     element: (
//       <Layout>
//         <CreateUser />
//       </Layout>
//     ),
//   },
//   {
//     id: "notFound",
//     path: "*",
//     element: <NotFound />,
//   },
// ];

// export default createBrowserRouter(Router);

import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import { lazy } from "react";
import Layout from "../layout";
import ProtectedRoute from "./protectedRouter";

// Rol actual del usuario (simulado). Debe venir del almacenamiento local o de tu sistema de autenticación.
const currentUserRole = localStorage.getItem("@USER")
  ? JSON.parse(localStorage.getItem("@USER") as string).role
  : "CUSTOMER"; // Asignamos "CUSTOMER" como predeterminado para no autenticados.

const Login = lazy(() => import("../views/Login"));
const ChangePassword = lazy(() => import("../views/ChangePassword"));
const Home = lazy(() => import("../views/Home"));
const OrderDownload = lazy(() => import("../views/OrderDownload"));
const OrderManagement = lazy(() => import("../views/OrderManagement"));
const CreateUser = lazy(() => import("../views/CreateUser"));
const CustomerRegistration = lazy(
  () => import("../views/CustomerRegistration")
);
const NotFound = lazy(() => import("../views/NoFound"));

const Router: RouteObject[] = [
  {
    id: "redirect-to-login",
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    id: "login",
    path: "/login",
    element: <Login />,
  },
  {
    id: "changePassword",
    path: "/changePassword/:_id",
    element: <ChangePassword />,
  },
  {
    id: "home",
    path: "/home",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    id: "order-download",
    path: "/order-download",
    element: (
      <Layout>
        <OrderDownload />
      </Layout>
    ),
  },
  {
    id: "order-management",
    path: "/order-management",
    element: (
      <Layout>
        <OrderManagement />
      </Layout>
    ),
  },
  {
    id: "customer-registration",
    path: "/customer-registration",
    element: (
      <Layout>
        <CustomerRegistration />
      </Layout>
    ),
  },
  // Ruta protegida para ADMIN
  {
    id: "create-user",
    path: "/create-user",
    element: (
      <ProtectedRoute allowedRoles={["ADMIN"]} userRole={currentUserRole}>
        <Layout>
          <CreateUser />
        </Layout>
      </ProtectedRoute>
    ),
  },
  // Ruta protegida para ADMIN
  {
    id: "edit-user",
    path: "/edit-user/:_id",
    element: (
      <ProtectedRoute allowedRoles={["ADMIN"]} userRole={currentUserRole}>
        <Layout>
          <CreateUser />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    id: "notFound",
    path: "*",
    element: <NotFound />,
  },
];

export default createBrowserRouter(Router);
