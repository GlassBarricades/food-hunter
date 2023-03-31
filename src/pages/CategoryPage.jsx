import { Title } from "@mantine/core";
import { useParams } from "react-router-dom";
import MenuGridCategory from "../components/MenuGridCategory";

const CategoryPage = ({ data }) => {
  const { category } = useParams();
  const dataItem = data.filter((item) => {
    if (item.link === category) {
      return item;
    }
  });
  return (
    <>
      <Title mb="xl">{dataItem[0].name}</Title>
      <MenuGridCategory data={dataItem[0].dataMenu} variant="price" />
    </>
  );
};
export default CategoryPage;
