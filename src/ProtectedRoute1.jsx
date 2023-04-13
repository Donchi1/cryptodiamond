import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "./database/firebaseDb";
import { useAuthState } from "react-firebase-hooks/auth";
import useGetDocument from "./components/hooks/UseDocument";

function ProtectedRoute1({ children }) {
  const authUser = auth.currentUser;
  const [user, loading, error] = useGetDocument("users", authUser?.uid, {
    snap: true,
  });

  // if (authUser && !user.verified)
  //   return <Navigate replace to="/account/verify" />;

  return <Outlet />;
}

export default ProtectedRoute1;
