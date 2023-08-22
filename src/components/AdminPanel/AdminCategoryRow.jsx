import { Image } from "@mantine/core";
import AdminPanelSettings from "./AdminPanelSettings";
import { edited } from "../../store/editSlice";
import { useDispatch } from "react-redux";
import { memo } from "react";
import { useParams } from "react-router-dom";

const AdminCategoryRow = memo(({ element }) => {
  const dispatch = useDispatch();
  const { categoryElement } = useParams();
  return (
    <tr>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>
        <Image width={50} src={element.image} alt={element.name} />
      </td>
      <td>{`/${element.link}`}</td>
      <td>
        <AdminPanelSettings
          element={element}
          deleteLink={`/${categoryElement}/${element.link}`}
          handleEdit={dispatch(edited)}
        />
      </td>
    </tr>
  );
});
export default AdminCategoryRow;
