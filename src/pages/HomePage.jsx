import { Title } from "@mantine/core";
import MenuGridCategory from "../components/MenuGridCategory";
import PromotionCard from "../components/PromotionCard";
import { Carousel } from '@mantine/carousel';

const HomePage = ({ categories, promotionNow }) => {
  console.log(promotionNow)
  return (
    <>
    <Carousel mx="auto">
    {promotionNow.map((item, index) => {
        return <Carousel.Slide key={index}><PromotionCard image={item.image} title={item.title} day={item.day} description={item.description}/></Carousel.Slide>
      })}
    </Carousel>
      
      <MenuGridCategory variant="home" categories={categories} />
    </>
  );
};
export default HomePage;
