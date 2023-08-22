import useFetchData from "../../hooks/useFetchData";
import useSortData from "../../hooks/useSortData";
import { useParams } from "react-router-dom";
import AdminTable from "./AdminTable";
import { useSelector } from "react-redux";
import AdminCategoryForm from "./AdminCategoryForm";
import AdminModal from "./AdminModal";
import AdminHeaderBlock from "./AdminHeaderBlock";
import AdminCategoryRow from "./AdminCategoryRow";

const AdminCategory = () => {
  const { categoryElement } = useParams();
  //   const categories = useSelector(state => state.categories.categories)
  //   const loading = useSelector(state => state.categories.status)
  const [categories, loading] = useFetchData(`/${categoryElement}/`);
  const data = useSortData(categories, "position");

  const rows = data.map((element) => (
	<AdminCategoryRow key={element.uuid} element={element} />
  ));

  return (
    <>
      <AdminModal>
        <AdminCategoryForm />
      </AdminModal>
	  <AdminHeaderBlock />
      <AdminTable
        rows={rows}
        columnArray={[
          "Сортировка",
          "Название",
          "Картинки",
          "Ссылка",
          "Настройки",
        ]}
        loading={loading}
      />
    </>
  );
};
export default AdminCategory;
