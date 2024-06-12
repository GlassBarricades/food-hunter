import { update, ref } from 'firebase/database';
import { db } from '../firebase';

const submitChangeDataBase = async (data, link, tempId, reset, close) => {
  try {
    await update(ref(db, link), {
      ...data,
      uuid: tempId,
    });

    reset();
    close();
  } catch (error) {
    console.error("Error updating database: ", error);
  }
};

export default submitChangeDataBase;
