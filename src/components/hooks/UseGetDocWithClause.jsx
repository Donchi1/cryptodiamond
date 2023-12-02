import { useState, useEffect } from "react";
import {  onSnapshot, collection, query, where} from "firebase/firestore";
import { db } from "../../database/firebaseDb";



function useGetDocWithClause(info) {

  const [document, setDocument] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDocument = async () => {

        const unsubscribe = onSnapshot(
          query(collection(db, info.colls), where(info.q.path, info.q.condition, info.q.value)),
          (qsnap) => {
            setDocument(qsnap.docs.map(each => ({...each.data(), id:each.id })));
            setLoading(false);
           
          },
          (err) => {
            setError(err.message);
            setLoading(false);
           
          }
        );
        return unsubscribe;
     
    };

    getDocument();
  }, []);

  return [document, loading, error];
}

export default useGetDocWithClause;
