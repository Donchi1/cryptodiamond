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
  console.log(error);
  console.log(myCollection);

  useEffect(() => {
    const handleCollection = () => {
      const unsubscribe = onSnapshot(
        collection(db, col),
        (qsnap) => {
          setMyCollection(qsnap.docs.map((each) => each.data()));
          setLoading(false);
        },
        (err) => {
          setError(err.message);
          setLoading(false);
        }
      );
      unsubscribe();
    };
    handleCollection();
  }, []);

  return [myCollection, loading, error];
}

export default useCollection;
