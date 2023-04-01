import { Title } from "@mantine/core";
import MenuGridCategory from "../components/MenuGridCategory";
const MenuPage = ({ data }) => {
  return (
    <>
      <Title mb="md">Меню</Title>
      <MenuGridCategory data={data} />
    </>
  );
};
export default MenuPage;
