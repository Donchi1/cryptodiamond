import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../database/firebaseDb";

function useCollection(col) {
  const [myCollection, setMyCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, col), orderBy("date", "desc")),
      (qsnap) => {
        setMyCollection(qsnap.docs.forEach((each) => each.data()));
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    unsubscribe();
  }, []);

  return [myCollection, loading, error];
}

export default useCollection;
