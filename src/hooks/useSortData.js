const useSortData = (arr, field) => {
  arr.sort((a, b) => (a[field] > b[field] ? 1 : -1));
  return arr;
};
export default useSortData;
