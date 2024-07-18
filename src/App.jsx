import { ToastContainer, Slide } from "react-toastify";
import Router from "./routes";
import AuthContextProvider from "./contexts/AuthContext";
import { Suspense } from "react";
import Loading from "./components/Loading";
import UserInfoContextProvider from "./contexts/UserInfoContext";
import PageContextProvider from "./contexts/PageContext";

export default function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <UserInfoContextProvider>
          <PageContextProvider>
            <AuthContextProvider>
              <Router />
              <ToastContainer
                position="top-right"
                autoClose={3000}
                transition={Slide}
              />
            </AuthContextProvider>
          </PageContextProvider>
        </UserInfoContextProvider>
      </Suspense>
    </>
  );
}
