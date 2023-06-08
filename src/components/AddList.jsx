import { MultiSelect } from "@mantine/core";

const data = [
  { name: "Сырный борт 25" },
  { value: "ng", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "vue", label: "Vue" },
  { value: "riot", label: "Riot" },
  { value: "next", label: "Next.js" },
  { value: "blitz", label: "Blitz.js" },
];

const AddList = () => {
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
                to={`${item.link}`}
              >
                <Card.Section>
                  <Image
                    src={item.image}
                    height={160}
                    alt={item.name}
                    fit={category === "napitki" ? "contain" : "cover"}
                  />
                </Card.Section>
                <Text mt="xs" size="lg">
                  {itemVariants[0].price} руб.
                </Text>

                <Text weight={500} size="lg" mt="md">
                  {item.name}
                </Text>
                <Button mt="sm" variant="default" fullWidth>
                  Выбрать
                </Button>
              </Card>
            );
          })}
        </SimpleGrid>
  );
};
export default AddList;
