import { Title } from "@mantine/core";
import MenuGridCategory from "../components/MenuGridCategory";

const HomePage = ({ data, categories }) => {
  return (
    <>
      <MenuGridCategory data={data} variant="home" categories={categories} />
    </>
  );
};
export default HomePage;
