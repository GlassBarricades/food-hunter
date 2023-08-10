import { ref, remove } from 'firebase/database'
import { db } from '../firebase'

const deleteDataBase = link => {
	remove(ref(db, link))
}
export default deleteDataBase
