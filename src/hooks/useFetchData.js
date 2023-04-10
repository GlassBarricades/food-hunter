import { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  function fetchData(url) {
    setLoading(true);
    onValue(ref(db, url), (snapshot) => {
      setData([]);
      const dataValue = snapshot.val();
      if (dataValue !== null) {
        Object.values(dataValue).map((item) =>
          setData((oldArray) => [...oldArray, item])
        );
        setLoading(false);
      }
    });
  }

  useEffect(() => {
    if (url) {
      fetchData(url);
    }
  }, [url]);

  return [data, loading];
};
export default useFetchData;
