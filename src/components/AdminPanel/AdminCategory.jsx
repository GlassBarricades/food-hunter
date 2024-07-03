import useFetchSortedData from '../../hooks/useFetchSortedData'
import { useParams } from 'react-router-dom'
import AdminTable from './AdminTable'
import AdminCategoryForm from './AdminCategoryForm'
import AdminModal from './AdminModal'
import AdminHeaderBlock from './AdminHeaderBlock'
import AdminRow from './AdminRow'
import { useMemo } from "react";

const AdminCategory = () => {
  const { categoryElement, subelement, subcategory } = useParams();
  const [categories, loading] = useFetchSortedData(
    !subcategory ? `/${categoryElement}/` : `/${subcategory}/${subelement}/`,
    "position"
  );

  const rows = useMemo(() => 
    categories.map((element) => (
      <AdminRow key={element.uuid} element={element} variant="category" />
    )),
    [categories]
  );

  const columnArray = ['Сортировка', 'Название', 'Картинки', 'Ссылка', 'Настройки'];

  return (
    <>
      <AdminModal>
        <AdminCategoryForm />
      </AdminModal>
      <AdminHeaderBlock title="Категории"/>
      <AdminTable
        rows={rows}
        columnArray={columnArray}
        loading={loading}
      />
    </>
  );
};

export default AdminCategory;
