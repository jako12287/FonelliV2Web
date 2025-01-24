import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import { lazy } from "react";
import Layout from "../layout";

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
const Policy = lazy(() => import("../views/Policy"));

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("@TOKEN");
  const user = localStorage.getItem("@USER");

  // Si no hay token o usuario, redirige al login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token y usuario, renderiza el contenido protegido
  return children;
};

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
    element: (
      <ProtectedRoute>
        <ChangePassword />
      </ProtectedRoute>
    ),
  },
  {
    id: "home",
    path: "/home",
    element: (
      <ProtectedRoute>
        <Layout>
          <Home />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    id: "order-download",
    path: "/order-download",
    element: (
      <ProtectedRoute>
        <Layout>
          <OrderDownload />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    id: "order-management",
    path: "/order-management",
    element: (
      <ProtectedRoute>
        <Layout>
          <OrderManagement />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    id: "customer-registration",
    path: "/customer-registration",
    element: (
      <ProtectedRoute>
        <Layout>
          <CustomerRegistration />
        </Layout>
      </ProtectedRoute>
    ),
  },
  // Ruta protegida para ADMIN
  {
    id: "create-user",
    path: "/create-user",
    element: (
      // <ProtectedRoute allowedRoles={["ADMIN"]} userRole={currentUserRole}>

      <ProtectedRoute>
        <Layout>
          <CreateUser />
        </Layout>
      </ProtectedRoute>
      // </ProtectedRoute>
    ),
  },
  // Ruta protegida para ADMIN
  {
    id: "edit-user",
    path: "/edit-user/:_id",
    element: (
      // <ProtectedRoute allowedRoles={["ADMIN"]} userRole={currentUserRole}>
      <ProtectedRoute>
        <Layout>
          <CreateUser />
        </Layout>
      </ProtectedRoute>
      // </ProtectedRoute>
    ),
  },
  {
    id: "policy",
    path: "/policy",
    element: (
        <Policy />
    ),
  },
  {
    id: "notFound",
    path: "*",
    element: <NotFound />,
  },
];

export default createBrowserRouter(Router);
