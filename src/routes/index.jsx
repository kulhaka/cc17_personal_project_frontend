import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { RouterProvider } from "react-router-dom";
import RedirectIfLogged from "../features/authenication/components/RedirectIfLogged";
import ProtectedRoute from "../features/authenication/components/ProtectedRoute";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const PageContainer = lazy(() => import("../pages/PageContainer"));
const MainContainer = lazy(() => import("../layouts/MainContainer"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainContainer />
      </ProtectedRoute>
    ),
    children: [{ path: "/", element: <PageContainer /> }],
  },
  {
    path: "/login",
    element: (
      <RedirectIfLogged>
        <LoginPage />,
      </RedirectIfLogged>
    ),
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
