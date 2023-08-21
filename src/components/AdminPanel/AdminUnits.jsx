import useFetchData from "../../hooks/useFetchData";
import AdminUnitsForm from "./AdminUnitsForm";
import AdminTable from "./AdminTable";
import AdminUnitsRow from "./AdminUnitsRow";
import AdminHeaderBlock from "./AdminHeaderBlock";
import AdminModal from "./AdminModal";

const AdminCategoryAlcohol = () => {
  const [categories, loading] = useFetchData(`/units/`);

  const rows = categories.map((element) => (
    <AdminUnitsRow key={element.uuid} element={element} />
  ));

  return (
    <>
      <AdminModal>
        <AdminUnitsForm />
      </AdminModal>
      <AdminHeaderBlock title="Единицы измерения" />
      <AdminTable
        rows={rows}
        columnArray={["id", "Название", "Настройки"]}
        loading={loading}
      />
    </>
  );
};
export default AdminCategoryAlcohol;
