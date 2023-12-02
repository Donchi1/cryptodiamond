import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useGetDocWithClause from "./components/hooks/UseGetDocWithClause";
import Loader from "./components/Loader";

function ProtectedRouteAdmin() {
  const [admin, loading] = useGetDocWithClause({
    colls: "users",
    q: { path: "isAdmin", condition: "==", value: true },
  });
  const router = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!admin[0]?.isAdmin) {
        router("/adm/login", { replace: true });
      }
    }
  }, [loading, admin]);

  if (loading) return <Loader />;

  return <Outlet />;
}

export default ProtectedRouteAdmin;
