import { set, ref } from 'firebase/database';
import { db } from '../firebase';
import { uid } from 'uid';

const writeToDatabase = async (link, data, reset, close, withId) => {
  const uuid = uid();
  const dataWithId = { ...data, uuid };

  try {
    if (withId) {
      await set(ref(db, `${link}${uuid}`), dataWithId);
    } else {
      await set(ref(db, link), dataWithId);
    }

    reset();
    close();
  } catch (error) {
    console.error("Error writing to database: ", error);
  }
};

export default writeToDatabase;
