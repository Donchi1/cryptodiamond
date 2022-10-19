import React, { useState, useEffect } from "react";
import {
  collection,
  getDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../database/firebaseDb";

function useCollections(colls) {
  const [myCollection, setMyCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    colls.map((each, idx) => {
      if (colls[idx]) {
        const unsubscribe = onSnapshot(
          query(collection(db, each), orderBy("date", "desc")),
          (qsnap) => {
            myCollection.push(qsnap.forEach((each) => each.data()));
            setLoading(false);
          },
          (err) => {
            setError(err.message);
            setLoading(false);
          }
        );
        unsubscribe();
      }
    });
  }, []);

  return [myCollection, loading, error];
}

export default useCollections;
