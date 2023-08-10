const useSortDataVisible = (arr, field) => {
	if (arr) {
		arr.slice().sort((a, b) => (a[field] - b[field] ? 1 : -1))
		// arr.sort((a, b) => (a[field] > b[field] ? 1 : -1));
		return arr.filter(item => {
			return item.visible === false
		})
	}
}
export default useSortDataVisible
