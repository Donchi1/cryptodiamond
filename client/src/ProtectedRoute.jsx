import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "./database/firebaseDb";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const authUser = auth.currentUser;
  const user = useSelector((state) => state.auth.userData);

  if (authUser) return <Outlet />;
  return <Navigate replace to="/auth/login" />;
}

export default ProtectedRoute;
