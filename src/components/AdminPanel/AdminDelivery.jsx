import {
  ActionIcon,
  Box,
  Button,
  Group,
  ScrollArea,
  Title,
} from "@mantine/core";
import { Pencil } from "tabler-icons-react";
import { editedText, openModalText } from "../../store/textEditSlice";
import { useDispatch, useSelector } from "react-redux";
import useFetchDataOne from "../../hooks/useFetchDataOne";
import AdminDeliveryForm from "./AdminDeliveryForm";
import AdminModalText from "./AdminModalText";

const AdminDelivery = () => {
    const [data, loading] = useFetchDataOne("/delivery/");
    const dispatch = useDispatch();

  return (
    <Box>
      <AdminModalText size="xl">
        <AdminDeliveryForm link={"/delivery/"} />
      </AdminModalText>
      <Group justify="space-between" mt="md" mb="md">
        <Title>Доставка</Title>
        <Group>
          <ActionIcon
            size="lg"
            onClick={() => dispatch(editedText(data))}
          >
            <Pencil size="1.2rem" />
          </ActionIcon>
        </Group>
      </Group>
      <ScrollArea h={"80vh"} miw={"100%"} mx="auto" offsetScrollbars>
      <div dangerouslySetInnerHTML={{ __html: data.text }}></div>
      </ScrollArea>
    </Box>
  );
};
export default AdminDelivery;
