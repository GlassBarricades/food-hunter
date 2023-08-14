import { set, ref } from 'firebase/database'
import { db } from '../firebase'
import { uid } from 'uid'

const writeToDatabase = (link, data, reset, close, withId) => {
	const uuid = uid()
	if (withId) {
		set(ref(db, `${link}${uuid}`), {
			...data,
			uuid: uuid,
		})
	} else {
		set(ref(db, link), {
			...data,
			uuid: uuid,
		})
	}
	reset()
	close()
}

export default writeToDatabase
