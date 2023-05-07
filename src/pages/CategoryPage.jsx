import { useLoaderData, useParams } from "react-router-dom";
import MenuGridCategory from "../components/MenuGridCategory";
import useFetchData from "../hooks/useFetchData";

const CategoryPage = ({ data, variant }) => {
  // const { category, kind } = useParams();
  const { dataItem, category } = useLoaderData();
  console.log(category);

  // const dataItem = data.filter((item) => {
  //   if (item.link === category) {
  //     return item;
  //   }
  // });
  // const sushiData = data.filter((item) => {
  //   if (item.link === kind) {
  //     return item.items;
  //   }
  // });
  return (
    <>
      {/* {variant === "sushi" ? (
        <MenuGridCategory data={sushiData[0].items} variant="price" />
      ) : (
        <MenuGridCategory
          data={dataItem[0].dataMenu}
          variant="price"
          categories={dataCategory}
        />
      )} */}
    </>
  );
};

const categoryLoader = async ({ params }) => {
  console.log({ params });
  const category = params.category;
  const categories = useFetchData(`/menu/${category}`);
  const dataItem = await categories;

  return { dataItem, category };
};

export { categoryLoader };
export default CategoryPage;
