const useSortDataVisible = (arr, field) => {
	if (arr) {
		const arrVisible = arr.filter(item => {
			return item.visible === false
		})
		const arrSort = arrVisible.slice().sort((x, y) => x[field] - y[field])
		return arrSort
	}
}
export default useSortDataVisible
