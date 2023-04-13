import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { auth, db } from "./database/firebaseDb";
import { getAdminUser } from "./state/adminAuthSlice";

function ProtectedRouteAdmin() {
  const authUser = auth.currentUser;

  const admin = JSON.parse(localStorage.getItem("admin"));

  if (authUser && admin?.isAdmin) return <Outlet />;
  return <Navigate replace to="/adm/login" />;
}

export default ProtectedRouteAdmin;
