import { Button, Card, Image, SimpleGrid, Text } from "@mantine/core";
import { Link } from "react-router-dom";

const MenuGridCategory = ({ data, variant }) => {
  return (
    <SimpleGrid
      cols={5}
      spacing="xl"
      breakpoints={[
        { maxWidth: "xl", cols: 5, spacing: "lg" },
        { maxWidth: "lg", cols: 4, spacing: "lg" },
        { maxWidth: "md", cols: 3, spacing: "md" },
        { maxWidth: "sm", cols: 2, spacing: "sm" },
        { maxWidth: "xs", cols: 2, spacing: "sm" },
      ]}
    >
      {data.map((item, index) => {
        return (
          <Card
            key={index}
            shadow="sm"
            padding="xl"
            radius="lg"
            component={Link}
            to={variant === "home" ? `menu/${item.link}` : item.link}
          >
            <Card.Section>
              <Image src={item.img} height={160} alt={item.name} />
            </Card.Section>
            {variant === "price" ? (
              <Text mt="xs" size="lg">
                {item.variant[0].price} руб.
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
  );
};
export default MenuGridCategory;
