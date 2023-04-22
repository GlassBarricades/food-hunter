import { Button, Group, Title, Modal, TextInput, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { uid } from "uid";
import useFetchData from "../../hooks/useFetchData"

const AdminCategory = ({writeToDatabase, handleDelete}) => {
  const [opened, handlers] = useDisclosure(false, {
    onClose: () => resetState(),
  });
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [categories] = useFetchData(`/categories/`);

  const resetState = () => {
    setName("");
    setLink("");
  };

  console.log(categories)

  const rows = categories.map((element) => (
    <tr key={element.link}>
      <td>{element.name}</td>
      <td>{element.link}</td>
    </tr>
  ));


  return (
    <>
      <Modal opened={opened} onClose={handlers.close} title="Добавление категории">
        <form onSubmit={writeToDatabase(
            `/categories/${link}`,
            {
              name: name,
              link: link,
              uuid: uid(),
            },
            resetState,
            handlers.close
          )}>
          <TextInput
            placeholder="Название катерогии"
            label="Название категории"
            withAsterisk
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            placeholder="Ссылка для меню"
            label="Ссылка для меню"
            withAsterisk
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <Button mt="md" type="submit">
              Отправить
          </Button>
        </form>
      </Modal>
      <Group position="apart">
        <Title>Категории меню</Title>
        <Button onClick={handlers.open}>Добавить категорию</Button>
      </Group>
      <Table highlightOnHover withBorder withColumnBorders>
      <thead>
        <tr>
          <th>Название</th>
          <th>Ссылка</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
    </>
  );
};
export default AdminCategory;
