import React, { useState, useEffect } from "react";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../database/firebaseDb";

function useGetDocument(colls, docId, { snap }) {
  const [document, setDocument] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (snap) {
        const unsubscribe = onSnapshot(
          doc(db, colls, docId),
          (qsnap) => {
            setDocument(qsnap.forEach((each) => each.data()));
            setLoading(false);
          },
          (err) => {
            setError(err.message);
            setLoading(false);
          }
        );
        unsubscribe();
      }else{

        try {
          const data = await getDoc(doc(db, colls, docId));
          setDocument(data);
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      }
    };
    getData();
  }, [docId]);

  return [document, loading, error];
}

export default useGetDocument;
