const useSortData = (arr, field) => {
  if (arr) {
    arr.sort((a, b) => (a[field] > b[field] ? 1 : -1));
    return arr
  }
};
export default useSortData;