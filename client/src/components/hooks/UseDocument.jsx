import React, { useState, useEffect } from "react";
import { getDoc, doc, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "../../database/firebaseDb";

function useGetDocument(colls, docId, { snap, setFormData }) {
  const [document, setDocument] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDocument = async () => {
      if (snap) {
        const unsubscribe = onSnapshot(
          doc(db, colls, docId),
          (qsnap) => {
            setDocument(qsnap.data());
            setLoading(false);
            if (setFormData) setFormData(qsnap.data());
          },
          (err) => {
            setError(err.message);
            setLoading(false);
            if (setFormData) setFormData({});
          }
        );
        return unsubscribe;
      } else {
        try {
          const data = await getDoc(doc(db, colls, docId));
          setDocument(data.data());
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      }
    };

    getDocument();
  }, []);

  return [document, loading, error];
}

export default useGetDocument;
