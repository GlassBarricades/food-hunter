import {
  Button,
  Group,
  Title,
  Modal,
  TextInput,
  NumberInput,
  Table,
  Image,
  ActionIcon,
  Checkbox,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import useSortData from "../../hooks/useSortData";
import { uid } from "uid";
import { ref, update, remove } from "firebase/database";
import { db } from "../../firebase";
import { Pencil, Trash, Eye, EyeOff } from "tabler-icons-react";
import { useParams } from "react-router-dom";

const AdminCategory = ({ writeToDatabase }) => {
  const { categoryElement } = useParams();
  const colorScheme = useMantineColorScheme();
  const [opened, handlers] = useDisclosure(false, {
    onClose: () => resetState(),
  });
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [position, setPosition] = useState(0);
  const [image, setImage] = useState("");
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [categories] = useFetchData(`/${categoryElement}/`);
  const data = useSortData(categories, "position");

  console.log(categories);

  console.log(categoryElement);

  const resetState = () => {
    setName("");
    setLink("");
    setPosition(0);
    setImage("");
    setVisible(false);
    setIsEdit(false);
  };

  const handleDelete = (item, base) => {
    remove(ref(db, `/${base}/${item.link}`));
  };

  const handleEdit = (item) => {
    setIsEdit(true);
    setName(item.name);
    setLink(item.link);
    setPosition(item.position);
    setImage(item.image);
    setVisible(item.visible);
    handlers.open();
  };

  const rows = data.map((element) => (
    <tr key={element.link}>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>
        <Image width={50} src={element.image} alt={element.name} />
      </td>
      <td>{`/${element.link}`}</td>
      <td>
        <Group>
          <ActionIcon
            mt="xs"
            variant={colorScheme.colorScheme === "dark" ? "outline" : "default"}
            onClick={() => handleEdit(element)}
            color={colorScheme.colorScheme === "dark" ? "yellow.5" : undefined}
          >
            <Pencil size="1rem" />
          </ActionIcon>
          <ActionIcon
            mt="xs"
            variant={colorScheme.colorScheme === "dark" ? "outline" : "default"}
            onClick={() => handleDelete(element, "categories")}
            color={colorScheme.colorScheme === "dark" ? "yellow.5" : undefined}
          >
            <Trash size="1rem" />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <>
      <Modal
        opened={opened}
        onClose={handlers.close}
        title={isEdit ? "Редактирование категории" : "Добавление категории"}
      >
        <form
          onSubmit={writeToDatabase(
            `/${categoryElement}/${link}`,
            {
              name: name,
              link: link,
              position: position,
              image: image,
              visible: visible,
              uuid: uid(),
            },
            resetState,
            handlers.close
          )}
        >
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
          <NumberInput
            placeholder="Позиция для сортировки"
            label="Позиция для сортировки"
            value={position}
            onChange={setPosition}
          />
          <TextInput
            label="Картинка"
            placeholder="Картинка"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <Group>
            <Checkbox
              mt="xs"
              size="md"
              label="Скрыть"
              checked={visible}
              onChange={(event) => setVisible(event.currentTarget.checked)}
            />
          </Group>
          <Button mt="md" type="submit">
            {isEdit ? "Сохранить" : "Отправить"}
          </Button>
        </form>
      </Modal>
      <Group position="apart">
        <Title>Категории меню</Title>
        <Button onClick={handlers.open}>Добавить категорию</Button>
      </Group>
      <Table
        highlightOnHover
        withBorder
        withColumnBorders
        fontSize="md"
        mt="md"
      >
        <thead>
          <tr>
            <th>Сортировка</th>
            <th>Название</th>
            <th>Картинка</th>
            <th>Ссылка</th>
            <th>Настройки</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};
export default AdminCategory;
