import React from "react";
import { useGetCurrentUser } from "./components/hooks/GetCurrentUser";

import Loader from "./components/Loader";

function AuthIsReady({ children }) {
  const [user, loading, error] = useGetCurrentUser();

  if (loading)
    return (
      <Loader/>
    );

  return children;
}

export default AuthIsReady;
