import { Button, Card, Image, SimpleGrid, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import ScrollToTop from "../helpers/ScrollToTop";
import useSortDataVisible from "../hooks/useSortDataVisible";
import { useSelector } from "react-redux";

const MenuGridCategory = ({ variant, categories }) => {
  const loading = useSelector((state) => state.categories.status);
  const dataCategories = useSortDataVisible(categories, "position");

  return (
    <>
      <ScrollToTop />
      {loading === "loading" ? (
		<Text size="xl">Загрузка...</Text>
      ) : (
        <SimpleGrid
        cols={{ base: 2, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing="xl"
        >
          {dataCategories.map((item, index) => {
            const itemVariants = item.variant
              ? Object.values(item.variant)
              : undefined;
            return (
              <Card
                key={index}
                shadow="sm"
                padding="xl"
                radius="lg"
                component={Link}
                to={
                  variant === "home"
                    ? `menu/${item.link}`
                    : item.link === "alcohole"
                    ? `alcohole/tabs/Вино`
                    : item.link === "napitki"
                    ? `napitki/tabs/Напитки`
                    : item.link === "goryachie-napitki"
                    ? `goryachie-napitki/tabs/Чайные%20напитки`
                    : item.link
                }
              >
                <Card.Section>
                  <Image src={item.image} height={160} alt={item.name} />
                </Card.Section>
                {variant === "price" ? (
                  <Text mt="xs" size="lg">
                    {itemVariants[0].price} руб.
                  </Text>
                ) : undefined}

                <Text weight={500} size="lg" mt="md">
                  {item.name}
                </Text>
                {variant === "price" ? (
                  <Button mt="sm" variant="default" fullWidth>
                    Выбрать
                  </Button>
                ) : undefined}
              </Card>
            );
          })}
        </SimpleGrid>
      )}
    </>
  );
};
export default MenuGridCategory;
