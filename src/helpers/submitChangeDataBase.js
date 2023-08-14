import { update, ref } from 'firebase/database'
import { db } from '../firebase'

const submitChangeDataBase = (data, link, tempId, reset, close) => {
	update(ref(db, link), {
		...data,
		uuid: tempId,
	})

	reset()
	close()
}

export default submitChangeDataBase
