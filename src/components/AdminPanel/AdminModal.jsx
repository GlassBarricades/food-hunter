import { Modal } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/editSlice";
import { memo } from "react";

const AdminModal = memo(({ children }) => {
  const edit = useSelector((state) => state.edit.edit);
  const open = useSelector((state) => state.edit.editModal);
  const dispatch = useDispatch();
  return (
    <Modal
      opened={open}
      onClose={() => dispatch(closeModal())}
      title={edit ? "Редактирование элемента" : "Добавление элемента"}
    >
      {children}
    </Modal>
  );
});
export default AdminModal;
