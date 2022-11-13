import React, { useEffect, useState } from "react";
import { auth, db } from "../../database/firebaseDb";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { getUser } from "../../state/authSlice";

export const useGetCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getDoc(doc(db, "users", user.uid)).then((fireUser) => {
          const { date, ...userInfo } = fireUser.data();
          dispatch(getUser(userInfo));
        });
        setLoading(false);
      } else {
        setLoading(false);
        setError("No user found. Please Reauthenticate!!");
      }
    });
  }, []);

  return [user, loading, error];
};
