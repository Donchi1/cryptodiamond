import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {auth} from "./database/firebaseDb"

function ProtectedRoute({ children}) {
  const authUser = auth.currentUser
  if (!authUser) return <Navigate replace to="/auth/login" />;


  return <Outlet />;
}

export default ProtectedRoute;
