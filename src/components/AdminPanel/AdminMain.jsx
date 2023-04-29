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
  Stack,
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
  const [openedVariant, handlersVariant] = useDisclosure(false, {
    onClose: () => resetState(),
  });
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [position, setPosition] = useState(0);
  const [image, setImage] = useState("");
  const [visible, setVisible] = useState(false);
  const [compound, setCompound] = useState("");
  const [size, setSize] = useState(0);
  const [weight, setWeight] = useState(0);
  const [price, setPrice] = useState(0);
  const [id, setId] = useState("");
  const [isEdit, setIsEdit] = useState(false);
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

  const resetStateVariant = () => {
    setSize(0);
    setWeight(0);
    setPrice(0);
    setId("");
    setIsEdit(false);
  };

  const handleDelete = (item, base) => {
    remove(ref(db, `/menu/${base}/${item.link}`));
  };

  const handleDeleteVariant = (item, base, variant) => {
    remove(ref(db, `/menu/${base}/${item.link}/variant/${variant}`));
  };

  const handleVariantAdd = (item) => {
    handlersVariant.open();
    setLink(item.link)
  }

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

  const handleEditVariant = (item, link) => {
    setIsEdit(true);
    setSize(item.size);
    setWeight(item.weight);
    setPrice(item.price);
    setId(item.id);
    setLink(link);
    handlersVariant.open();
  };

  const rows = data.map((element) => (
    <tr key={element.link}>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>
        <Image width={50} src={element.image} alt={element.name} />
      </td>
      <td>{`/${element.link}`}</td>
      <td>{element.compound}</td>
      <td>
        {element.variant ? Object.values(element.variant).map((item, index) => {
          return <Group key={index}>
            {item.size}
            <ActionIcon
            variant={colorScheme.colorScheme === "dark" ? "outline" : "default"}
            onClick={() => handleEditVariant(item, element.link)}
            color={colorScheme.colorScheme === "dark" ? "yellow.5" : undefined}
          >
            <Pencil size="1rem" />
          </ActionIcon>
          <ActionIcon
            variant={colorScheme.colorScheme === "dark" ? "outline" : "default"}
            onClick={() => handleDeleteVariant(element, adminElement, item.size)}
            color={colorScheme.colorScheme === "dark" ? "yellow.5" : undefined}
          >
            <Trash size="1rem" />
          </ActionIcon>
          </Group>
        }) : undefined}
        <Stack>
        </Stack>
      </td>
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
            onClick={() => handleVariantAdd(element)}
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
      <Modal
        opened={openedVariant}
        onClose={handlersVariant.close}
        title={isEdit ? "Редактирование категории" : "Добавление категории"}
      >
        <form
            onSubmit={writeToDatabase(
              `/menu/${adminElement}/${link}/variant/${size}`,
              {
                size: size,
                weight: weight,
                price: price,
                id: id,
              },
              resetStateVariant,
              handlersVariant.close
            )}
          >
            <NumberInput
              placeholder="Размер"
              label="Размер"
              value={size}
              onChange={setSize}
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
            <th>Варианты</th>
            <th>Настройки</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};
export default AdminMain;
