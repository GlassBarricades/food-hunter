import { Title } from "@mantine/core";
import MenuGridCategory from "../components/MenuGridCategory";

const HomePage = ({ data }) => {
  return (
    <>
      <MenuGridCategory data={data} variant="home"/>
    </>
  );
};
export default HomePage;
