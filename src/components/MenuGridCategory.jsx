import { Card, Image, SimpleGrid, Text } from "@mantine/core";

const MenuGridCategory = ({ data }) => {
  console.log(data);
  return (
    <SimpleGrid
      cols={6}
      spacing="xl"
      breakpoints={[
        { maxWidth: "lg", cols: 5, spacing: "lg" },
        { maxWidth: "md", cols: 4, spacing: "md" },
        { maxWidth: "sm", cols: 3, spacing: "sm" },
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
            component="a"
            href={item.link}
          >
            <Card.Section>
              <Image src={item.img} height={160} alt={item.name} />
            </Card.Section>

            <Text weight={500} size="lg" mt="md">
              {item.name}
            </Text>
          </Card>
        );
      })}
    </SimpleGrid>
  );
};
export default MenuGridCategory;
