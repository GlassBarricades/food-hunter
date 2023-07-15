import { Title, SimpleGrid } from "@mantine/core";
import PromotionCard from "../components/PromotionCard";

const PromotionPage = () => {
  return (
    <>
      <Title mb="xl">Акции</Title>
      <SimpleGrid cols={3}>
        <PromotionCard image={"https://i.ibb.co/w63F41f/two-kind-pizza-table.jpg"} title={"Каждый вторник вторая пицца бесплатно"}/>
        <PromotionCard image={"https://i.ibb.co/F3Vvc6Y/friends-eating-pizza-together-home.jpg"} title={"Каждую среду cкидка 30% на вынос"} />
        <PromotionCard image={"https://i.ibb.co/Pt4FD0g/cute-friends-cafe-eatting-pizza.jpg"} title={"Именинникам 15% скидка за три дня и после "}/>
      </SimpleGrid>
    </>
  );
};
export default PromotionPage;
