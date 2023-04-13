import React, { useState, useEffect } from "react";
import {
  collectionGroup,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../database/firebaseDb";

function useCollectionGroup(colls) {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sub = onSnapshot(
      query(collectionGroup(db, colls), orderBy("date")),
      (qs) => {
        setCollection(qs.docs.map((each) => ({ ...each.data(), id: each.id })));

        setError(null);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        setError(err.message);
      }
    );
    return () => {
      sub();
    };
  }, []);

  return [collection, loading, error];
}

export default useCollectionGroup;
