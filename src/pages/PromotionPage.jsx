import { useLoaderData } from "react-router-dom";
import { Title, SimpleGrid } from "@mantine/core";
import PromotionCard from "../components/PromotionCard";
import { getDatabase, ref, child, get } from "firebase/database";

const PromotionPage = () => {
  const { dataPromo } = useLoaderData();

  const visiblePromoItems = dataPromo.filter((item) => item.visible === false);
  const promoItems = visiblePromoItems.map((item) => (
    <PromotionCard
      key={item.uuid}
      image={item.image}
      title={item.name}
      day={item.day}
      description={item.descr}
    />
  ));
  
  return (
    <>
      <Title mb="xl">Акции</Title>
      <SimpleGrid
        cols={{base: 1, md: 2, xl: 3}}
        // breakpoints={[
        //   { maxWidth: "xl", cols: 3, spacing: "lg" },
        //   { maxWidth: "lg", cols: 2, spacing: "lg" },
        //   { maxWidth: "md", cols: 2, spacing: "md" },
        //   { maxWidth: "sm", cols: 1, spacing: "sm" },
        //   { maxWidth: "xs", cols: 1, spacing: "sm" },
        // ]}
      >
        {promoItems}
      </SimpleGrid>
    </>
  );
};

const promoLoader = async () => {
  const dbRef = ref(getDatabase());
  try {
    const snapshot = await get(child(dbRef, `/promo/`));
    if (snapshot.exists()) {
      const data = Object.values(snapshot.val());
      return { dataPromo: data };
    } else {
      console.log("No data available");
      return { dataPromo: [] };
    }
  } catch (error) {
    console.error(error);
  }
};

export { PromotionPage, promoLoader };
