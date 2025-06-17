import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();
  const processedRef = useRef(false);
  const handleAuthCallback = async () => {
    if (processedRef.current) return;
    processedRef.current = true;

    try {
      const urlParams = new URLSearchParams(window.location.search);

      const error = urlParams.get("error");
      if (error) {
        throw new Error(error);
      }

      const code = urlParams.get("code");
      if (!code && !error) {
        navigate("/sign-in", { replace: true });
        return;
      }

      if (!code) {
        throw new Error("No authorization code received");
      }

      const url = `${import.meta.env.VITE_API_URL}/api/auth/callback`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) {
        throw new Error("Failed to authenticate with the server");
      }

      const data = await res.json();
      if (!data.user && !data.jwt_token) {
        throw new Error("No user data returned from authentication");
      }

      localStorage.setItem("jwt_token", data.jwt_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/sent-messages", { replace: true });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    handleAuthCallback();
  }, []);

  return (
    <div className="h-full w-full flex justify-center items-center">
      Signing you in. Please wait...
    </div>
  );
};

export default AuthCallback;
