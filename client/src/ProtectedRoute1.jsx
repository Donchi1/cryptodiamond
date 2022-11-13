import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "./database/firebaseDb";
import { useAuthState } from "react-firebase-hooks/auth";

function ProtectedRoute1({ children }) {
  const authUser = auth.currentUser;
  if (authUser) return <Navigate replace to="/" />;

  return <Outlet />;
}

export default ProtectedRoute1;
