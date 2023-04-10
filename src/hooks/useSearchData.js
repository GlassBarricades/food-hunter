const useSearchData = (arr, field, find) => {

    const filteredCatalog = arr.filter((item) => {
           return item[field].toLowerCase().includes(find.toLocaleLowerCase());
         });

    return filteredCatalog
}
export default useSearchData;