import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children, protectedRoute }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    const user = localStorage.getItem("user");

    if (protectedRoute) {
      if (!token || !user) {
        navigate("/sign-in", { replace: true });
        return;
      } else {
        setLoading(false);
      }
    } else {
      if (token && user) {
        navigate("/inbox", { replace: true });
        return;
      } else {
        setLoading(false);
      }
    }
  }, [navigate, protectedRoute]);

  if (loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return children;
};

export default ProtectedRoutes;
