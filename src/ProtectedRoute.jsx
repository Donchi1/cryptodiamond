import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "./database/firebaseDb";
import useGetDocument from "./components/hooks/UseDocument";
import { useEffect } from "react";

function ProtectedRoute() {
  const authUser = auth.currentUser;
  const [user, loading, error] = useGetDocument("users", authUser?.uid, {
    snap: true,
  });
 
  const router = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router("/auth/login", { replace: true });
      }
    }
  }, [loading, user]);

  return <Outlet />;
}

export default ProtectedRoute;
