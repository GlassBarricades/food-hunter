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
  Text,
  Box,
  Collapse,
  Anchor,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import useSortData from "../../hooks/useSortData";
import { uid } from "uid";
import { ref, update, remove } from "firebase/database";
import { db } from "../../firebase";
import { Pencil, Trash } from "tabler-icons-react";

const AdminMain = ({ writeToDatabase }) => {
  const { adminElement } = useParams();
  const linkItem = useFetchDataOne(`/categories/${adminElement}`);
  const colorScheme = useMantineColorScheme();
  const [opened, handlers] = useDisclosure(false, {
    onClose: () => resetState(),
  });
  const [openedCollapse, { toggle }] = useDisclosure(false);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [position, setPosition] = useState(0);
  const [image, setImage] = useState("");
  const [visible, setVisible] = useState(false);
  const [compound, setCompound] = useState("");
  const [size1, setSize1] = useState(0);
  const [price1, setPrice1] = useState(0);
  const [id1, setId1] = useState("");
  const [size2, setSize2] = useState(0);
  const [price2, setPrice2] = useState(0);
  const [id2, setId2] = useState("");
  const [size3, setSize3] = useState(0);
  const [price3, setPrice3] = useState(0);
  const [id3, setId3] = useState("");
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
    setSize1(0);
    setPrice1(0);
    setId1("");
    setSize2(0);
    setPrice2(0);
    setId2("");
    setSize3(0);
    setPrice3(0);
    setId3("");
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
    setSize1(item.variant.one.size);
    setPrice1(item.variant.one.price);
    setId1(item.variant.one.id);
    setSize2(item.variant.two.size);
    setPrice2(item.variant.two.price);
    setId2(item.variant.two.id);
    setSize3(item.variant.three.size);
    setPrice3(item.variant.three.price);
    setId3(item.variant.three.id);
    handlers.open();
  };

  const rows = data.map((element) => (
    <tr key={element.link}>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>
        <Image width={50} src={element.image} alt={element.name} />
      </td>
      <td>
      <Group>
        {element.variant
          ? Object.values(element.variant).map((item, index) => {
            return item.id != "" ? <Text key={index}>{item.id}</Text> : undefined
                  
            })
          : undefined}
          </Group>
      </td>
      <td>{`/${element.link}`}</td>
      <td>{element.compound}</td>
      <td>
      <Group>
        {element.variant
          ? Object.values(element.variant).map((item, index) => {
            return item.size != 0 ? <Text key={index}>{item.size}шт</Text> : undefined
                  
            })
          : undefined}
          </Group>
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
              variant: {
                one: {
                  size: size1,
                  price: price1,
                  id: id1,
                },
                two: {
                  size: size2,
                  price: price2,
                  id: id2,
                },
                three: {
                  size: size3,
                  price: price3,
                  id: id3,
                },
              },
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
          <Text>Варианты блюда</Text>
          <NumberInput
            placeholder="Размер"
            label="Размер"
            value={size1}
            onChange={setSize1}
          />
          <NumberInput
            placeholder="Цена"
            label="Цена"
            precision={2}
            value={price1}
            onChange={setPrice1}
          />
          <TextInput
            label="id"
            placeholder="id"
            value={id1}
            onChange={(e) => setId1(e.target.value)}
          />
          <Group position="center" mb={5}>
            <Anchor onClick={toggle}>Еще варианты</Anchor>
          </Group>

          <Collapse in={openedCollapse}>
            <NumberInput
              placeholder="Размер"
              label="Размер"
              value={size2}
              onChange={setSize2}
            />
            <NumberInput
              placeholder="Цена"
              label="Цена"
              precision={2}
              value={price2}
              onChange={setPrice2}
            />
            <TextInput
              label="id"
              placeholder="id"
              value={id2}
              onChange={(e) => setId2(e.target.value)}
            />
            <NumberInput
              placeholder="Размер"
              label="Размер"
              value={size3}
              onChange={setSize3}
            />
            <NumberInput
              placeholder="Цена"
              label="Цена"
              precision={2}
              value={price3}
              onChange={setPrice3}
            />
            <TextInput
              label="id"
              placeholder="id"
              value={id3}
              onChange={(e) => setId3(e.target.value)}
            />
          </Collapse>
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
            <th>id</th>
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
