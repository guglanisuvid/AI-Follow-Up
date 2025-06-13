import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      localStorage.removeItem("jwt_token");
      localStorage.removeItem("user");
      navigate("/sign-in", { replace: true });
    } catch (error) {
      throw new Error("Failed to log out", error);
    }
  }, [navigate]);
  return (
    <div className="w-full h-full flex justify-center items-center">
      Signing out...
    </div>
  );
};

export default Logout;
