import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../../database/firebaseDb";

function useCollection(col) {
  const [myCollection, setMyCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, col),
      (qsnap) => {
        setMyCollection(
          qsnap.docs.map((each) => ({ ...each.data(), id: each.id }))
        );
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  return [myCollection, loading, error];
}

export default useCollection;
