import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "./database/firebaseDb";
import { useSelector } from "react-redux";

function ProtectedRouteAdmin() {
  const authUser = auth.currentUser;
  const user = useSelector((state) => state.auth.user);

  if (!authUser || !user?.isAdmin) return <Navigate replace to="/adm/login" />;

  return <Outlet />;
}

export default ProtectedRouteAdmin;
