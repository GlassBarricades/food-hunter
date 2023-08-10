import { set, ref } from 'firebase/database'
import { db } from '../firebase'

const writeToDatabase = (link, data, reset, close) => e => {
	e.preventDefault()
	set(ref(db, link), {
		...data,
	})

	reset()
	close()
}

export default writeToDatabase
