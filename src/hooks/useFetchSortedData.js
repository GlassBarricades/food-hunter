import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { ref, onValue } from 'firebase/database'

const useFetchSortedData = (url, field) => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (url) {
			fetchData(url)
		}
	}, [url])

	function fetchData(url) {
		setLoading(true)
		onValue(ref(db, url), snapshot => {
			setData([])
			const dataValue = Object.values(snapshot.val()).sort((a, b) =>
				a[field] > b[field] ? 1 : -1
			)
			if (dataValue !== null) {
				dataValue.map(item => setData(oldArray => [...oldArray, item]))
				setLoading(false)
			}
		})
	}

	return [data, loading]
}
export default useFetchSortedData
