import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ProtectRoute = () => {
  const [authentication, setAuthentication] = useState(false);
  const [loading, setLoading] = useState(true); 
  const verify = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/verify-token`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setAuthentication(true);
      } else {
        setAuthentication(false);
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      setAuthentication(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verify();
  }, []);

  // Show loading screen while verifying
  if (loading) {
    return <div>Loading.....</div>;
  }
  return authentication ? <Outlet /> : <Navigate to="/admin" />;
};

export default ProtectRoute;
