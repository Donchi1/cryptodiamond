import React, { useState, useEffect } from "react";
import {
  collectionGroup,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../database/firebaseDb";

function useCollectionGroup(colls) {
  const [collection, setcollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getGroups = () => {
      const sub = onSnapshot(
        query(collectionGroup(db, colls), orderBy("date", "desc")),
        (qs) => {
          setcollection(
            qs.docs.map((each) => {
              each.data();
            })
          );
          setError(null);
          setLoading(false);
        },
        (err) => {
          setLoading(false);
          setError(err.message);
        }
      );
      sub();
    };
    getGroups();
  }, []);

  return [collection, loading, error];
}

export default useCollectionGroup;
