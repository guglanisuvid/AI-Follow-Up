import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Message from "./pages/Message";
import NotFound from "./pages/NotFound";
import AuthCallback from "./pages/AuthCallback";
import SentMessages from "./pages/SentMessages";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Logout from "./utils/Logout";
import LabelledMessages from "./pages/LabelledMessages";

function App() {
  return (
    <div className="min-h-screen h-full w-full max-w-[2000px] bg-bg-100 text-text-100 px-16">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes protectedRoute={true}>
              <Message />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/sign-in"
          element={
            <ProtectedRoutes protectedRoute={false}>
              <SignIn />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/auth/callback"
          element={
            <ProtectedRoutes protectedRoute={false}>
              <AuthCallback />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/sent-messages"
          element={
            <ProtectedRoutes protectedRoute={true}>
              <SentMessages />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/labelled-messages"
          element={
            <ProtectedRoutes protectedRoute={true}>
              <LabelledMessages />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/logout"
          element={
            <ProtectedRoutes protectedRoute={true}>
              <Logout />
            </ProtectedRoutes>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
