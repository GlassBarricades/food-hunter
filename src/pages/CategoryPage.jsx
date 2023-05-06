import { useLoaderData, useParams } from "react-router-dom";
import MenuGridCategory from "../components/MenuGridCategory";
import useFetchData from "../hooks/useFetchData";

const CategoryPage = ({ data, variant }) => {
  // const { category, kind } = useParams();
  // const { dataCategory, category } = useLoaderData();

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
  // const category = params.category;
  const categories = useFetchData(`/menu/lanchi`);
  const item = await categories;

  return { item, category };
};

export { categoryLoader };
export default CategoryPage;
