import { useState, useEffect } from "react";
import { db} from "../firebase";
import { ref, onValue } from 'firebase/database';

import 'firebase/database';

const useFetchData = async (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

    function fetchData(url) {
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
    }, []);

   return [data, loading];
};
export default useFetchData;
