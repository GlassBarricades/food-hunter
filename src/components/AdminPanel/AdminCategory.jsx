import { Button, Group, Title } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';

const AdminCategory = () => {
  return (
    <>
      <Modal opened={opened} onClose={close} title="Добавление категории">
        
      </Modal>
      <Group position="apart">
        <Title>Категории меню</Title>
        <Button>Добавить категорию</Button>
      </Group>
    </>
  );
};
export default AdminCategory;
