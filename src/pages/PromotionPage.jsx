import { Title, SimpleGrid } from "@mantine/core";
import PromotionCard from "../components/PromotionCard";

const PromotionPage = ({data, getWeekDay}) => {
  return (
    <>
      <Title mb="xl">Акции</Title>
      <SimpleGrid cols={3}>
        {data.map((item, index) => {
          return <PromotionCard key={index} image={item.image} title={item.title} day={item.day} description={item.description}/>
        })}
      </SimpleGrid>
    </>
  );
};
export default PromotionPage;
