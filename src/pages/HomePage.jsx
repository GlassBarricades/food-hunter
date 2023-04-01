import { Title } from "@mantine/core";
import MenuGridCategory from "../components/MenuGridCategory";

const HomePage = ({ data }) => {
  return (
    <>
      <Title mb="md">Меню</Title>
      <MenuGridCategory data={data} />
    </>
  );
};
export default HomePage;
