import { Title } from "@mantine/core";
import MenuGridCategory from "../components/MenuGridCategory";
import PromotionCard from "../components/PromotionCard";

const HomePage = ({ categories, promotionNow }) => {
  console.log(promotionNow)
  return (
    <>
      {promotionNow.map((item, index) => {
        return <PromotionCard  key={index} image={item.image} title={item.title} day={item.day} />
      })}
      <MenuGridCategory data={data} variant="home" categories={categories} />
    </>
  );
};
export default HomePage;
