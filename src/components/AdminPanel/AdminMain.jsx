import { useParams } from "react-router-dom";
import useFetchDataOne from "../../hooks/useFetchDataOne";
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
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import useSortData from "../../hooks/useSortData";
import { uid } from "uid";
import { ref, update, remove } from "firebase/database";
import { db } from "../../firebase";
import { Pencil, Trash, Plus } from "tabler-icons-react";

const AdminMain = ({ writeToDatabase }) => {
  const { adminElement } = useParams();
  const linkItem = useFetchDataOne(`/categories/${adminElement}`);
  const colorScheme = useMantineColorScheme();
  const [opened, handlers] = useDisclosure(false, {
    onClose: () => resetState(),
  });
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [position, setPosition] = useState(0);
  const [image, setImage] = useState("");
  const [visible, setVisible] = useState(false);
  const [compound, setCompound] = useState("");
  const [variant, setVariant] = useState([
    {
      size: 25,
      weight: 0,
      price: 17.5,
      id: "10225",
    },
    {
      size: 30,
      weight: 0,
      price: 21.5,
      id: "10230",
    },
    {
      size: 35,
      weight: 0,
      price: 26,
      id: "10235",
    },
  ]);
  const [isEdit, setIsEdit] = useState(false);
  const [variantAdd, setVariantAdd] = useState([]);
  const [categories] = useFetchData(`/menu/${adminElement}`);
  const data = useSortData(categories, "position");

  const resetState = () => {
    setName("");
    setLink("");
    setPosition(0);
    setImage("");
    setVisible(false);
    setCompound("");
    setIsEdit(false);
  };

  const handleDelete = (item, base) => {
    remove(ref(db, `/menu/${base}/${item.link}`));
  };

  const handleEdit = (item) => {
    setIsEdit(true);
    setName(item.name);
    setLink(item.link);
    setPosition(item.position);
    setImage(item.image);
    setVisible(item.visible);
    setCompound(item.compound);
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
      {/* <form
            onSubmit={writeToDatabase(
              `/menu/${adminElement}/${link}/variant`,
              {
                name: name,
                link: link,
                position: position,
                image: image,
                visible: visible,
                compound: compound,
              },
              resetState,
              handlers.close
            )}
          >
            <NumberInput
              placeholder="Размер"
              label="Размер"
              value={position}
              onChange={setPosition}
            />
            <NumberInput
              placeholder="Вес"
              label="Вес"
              value={weight}
              onChange={setWeight}
            />
            <NumberInput
              placeholder="Цена"
              label="Цена"
              value={price}
              onChange={setPrice}
            />
            <TextInput
              label="id"
              placeholder="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
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
          </form> */}
      <td>{element.compound}</td>
      <td>
        <Group>
          <ActionIcon
            variant={colorScheme.colorScheme === "dark" ? "outline" : "default"}
            onClick={() => handleEdit(element)}
            color={colorScheme.colorScheme === "dark" ? "yellow.5" : undefined}
          >
            <Pencil size="1rem" />
          </ActionIcon>
          <ActionIcon
            variant={colorScheme.colorScheme === "dark" ? "outline" : "default"}
            onClick={() => handleDelete(element, adminElement)}
            color={colorScheme.colorScheme === "dark" ? "yellow.5" : undefined}
          >
            <Trash size="1rem" />
          </ActionIcon>
          <ActionIcon
            variant={colorScheme.colorScheme === "dark" ? "outline" : "default"}
            color={colorScheme.colorScheme === "dark" ? "yellow.5" : undefined}
          >
            <Plus size="1rem" />
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
            `/menu/${adminElement}/${link}`,
            {
              name: name,
              link: link,
              position: position,
              image: image,
              visible: visible,
              compound: compound,
              variant: variant,
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
          <Textarea
            placeholder="Состав"
            label="Состав"
            autosize
            minRows={3}
            value={compound}
            onChange={(e) => setCompound(e.target.value)}
          />
          <Button mt="md" type="submit">
            {isEdit ? "Сохранить" : "Отправить"}
          </Button>
        </form>
      </Modal>
      <Group position="apart">
        <Title>{linkItem[0].name}</Title>
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
            <th>Состав</th>
            <th>Настройки</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};
export default AdminMain;
