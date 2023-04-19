import { Button, Group, Title, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

const AdminCategory = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  return (
    <>
      <Modal opened={opened} onClose={close} title="Добавление категории">
        <form action="">
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
        </form>
      </Modal>
      <Group position="apart">
        <Title>Категории меню</Title>
        <Button onClick={open}>Добавить категорию</Button>
      </Group>
    </>
  );
};
export default AdminCategory;
