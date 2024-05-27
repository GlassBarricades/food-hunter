const useFilterArray = (array, field) => {
    const arrayFiltered = array.filter(item => {
        return item[field]
    })
    return arrayFiltered
}
export default useFilterArray