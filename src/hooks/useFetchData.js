import { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue } from 'firebase/database';

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (url) {
      setLoading(true);
      const fetchData = ref(db, url);
      onValue(fetchData, (snapshot) => {
        const dataValue = snapshot.val();
        if (dataValue !== null) {
          setData(Object.values(dataValue));
          setLoading(false);
        }
      }, (error) => {
        console.error("Firebase read failed:", error);
        setLoading(false);
      });
    }
  }, [url]);

  return [data, loading];
};

export default useFetchData;