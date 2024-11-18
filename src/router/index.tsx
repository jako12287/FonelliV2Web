import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import { lazy } from "react";
// eslint-disable-next-line react-refresh/only-export-components
const Login = lazy(() => import("../views/Login"));
const Home = lazy(() => import("../views/Home"));
const OrderDownload = lazy(() => import("../views/OrderDownload"));
const OrderManagement = lazy(() => import("../views/OrderManagement"));
const CustomerRegistration = lazy(
  () => import("../views/CustomerRegistration")
);
const NotFound = lazy(() => import("../views/NoFound"));

// eslint-disable-next-line react-refresh/only-export-components

const Router: RouteObject[] = [
  {
    id: "redirect-to-login",
    path: "/", // Ruta raíz
    element: <Navigate to="/login" replace />, // Redirige a /login
  },
  {
    id: "login",
    path: "/login",
    element: <Login />,
  },
  {
    id: "home",
    path: "/",
    element: <Home />,
  },
  {
    id: "order-download",
    path: "/order-download",
    element: <OrderDownload />,
  },
  {
    id: "order-management",
    path: "/order-management",
    element: <OrderManagement />,
  },
  {
    id: "customer-registration",
    path: "/customer-registration",
    element: <CustomerRegistration />,
  },
  {
    id: "notFound",
    path: "*",
    element: <NotFound />,
  },
];

export default createBrowserRouter(Router);
