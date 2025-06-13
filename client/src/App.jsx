import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Message from "./pages/Message";
import NotFound from "./pages/NotFound";
import AuthCallback from "./pages/AuthCallback";
import Inbox from "./pages/Inbox";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Logout from "./utils/Logout";

function App() {
  return (
    <div className="h-full w-full max-w-[2000px] bg-bg-100 text-text-100 px-16">
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
          path="/inbox"
          element={
            <ProtectedRoutes protectedRoute={true}>
              <Inbox />
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
