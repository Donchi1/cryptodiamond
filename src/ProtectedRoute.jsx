import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "./database/firebaseDb";
import { useSelector } from "react-redux";
import useGetDocument from "./components/hooks/UseDocument";

function ProtectedRoute({ children }) {
  const authUser = auth.currentUser;
  const [user, loading, error] = useGetDocument("users", authUser?.uid, {
    snap: true,
  });

  //const user = useSelector((state) => state.auth.userData);

  if (!authUser) return <Navigate replace to="/auth/login" />;
  // if (authUser && !user?.verified)
  //   return <Navigate replace to="/account/verify" />;
  return <Outlet />;
}

export default ProtectedRoute;
