import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./database/firebaseDb";

function ProtectedRouteV({ children }) {
  const authUser = auth.currentUser;
  if (!authUser) return <Navigate replace to="/auth/login" />;

  return children;
}

export default ProtectedRouteV;
