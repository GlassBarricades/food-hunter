import { Title } from "@mantine/core";
import { useParams } from "react-router-dom";
import MenuGridCategory from "../components/MenuGridCategory";
import useFetchData from "../hooks/useFetchData";

const CategoryPage = ({ data, variant }) => {
  const { category, kind } = useParams();
  const [dataCategory] = useFetchData(`/menu/${category}`)
  console.log(dataCategory)
  const dataItem = data.filter((item) => {
    if (item.link === category) {
      return item;
    }
  });
  const sushiData = data.filter((item) => {
    if (item.link === kind) {
      return item.items;
    }
  });
  return (
    <>
      {/* <Title mb="xl">{dataItem[0].name}</Title> */}
      {variant === "sushi" ? (
        <MenuGridCategory data={sushiData[0].items} variant="price"/>
      ) : (
        <MenuGridCategory data={dataItem[0].dataMenu} variant="price" categories={dataCategory}/>
      )}
    </>
  );
};
export default CategoryPage;