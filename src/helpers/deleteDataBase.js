import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

const deleteDataBase = async (link) => {
  try {
    await remove(ref(db, link));
  } catch (error) {
    console.error("Error deleting from database: ", error);
  }
};

export default deleteDataBase;
