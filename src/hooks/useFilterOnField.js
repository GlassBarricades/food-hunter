const useFilterOnField = (array, field) => {
    const object = array.find(item => item.link === field)
    return {object}
}
export default useFilterOnField;