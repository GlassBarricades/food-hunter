import {
  SimpleGrid,
  Card,
  Image,
  Text,
  ScrollArea,
} from "@mantine/core";
import { Link } from "react-router-dom";

const data = [
  {
    name: "Сырный борт 25",
    price: 25,
    id: "1232234254",
    image: "https://just-eat.by/image/data/shops/102232/163239.jpg",
  },
  {
    name: "Сырный борт 30",
    price: 25,
    id: "578",
    image: "https://just-eat.by/image/data/shops/102232/163239.jpg",
  },
  {
    name: "Сырный борт 25",
    price: 25,
    id: "1232234254",
    image: "https://just-eat.by/image/data/shops/102232/163239.jpg",
  },
  {
    name: "Сырный борт 25",
    price: 25,
    id: "1232234254",
    image: "https://just-eat.by/image/data/shops/102232/163239.jpg",
  },
  {
    name: "Сырный борт 25",
    price: 25,
    id: "1232234254",
    image: "https://just-eat.by/image/data/shops/102232/163239.jpg",
  },
  {
    name: "Сырный борт 25",
    price: 25,
    id: "1232234254",
    image: "https://just-eat.by/image/data/shops/102232/163239.jpg",
  },
  {
    name: "Сырный борт 25",
    price: 25,
    id: "1232234254",
    image: "https://just-eat.by/image/data/shops/102232/163239.jpg",
  },
  {
    name: "Сырный борт 25",
    price: 25,
    id: "1232234254",
    image: "https://just-eat.by/image/data/shops/102232/163239.jpg",
  },
  {
    name: "Сырный борт 25",
    price: 25,
    id: "1232234254",
    image: "https://just-eat.by/image/data/shops/102232/163239.jpg",
  },
];

const AddList = () => {
  return (
    <ScrollArea h={250}>
      <SimpleGrid
        cols={5}
        spacing="xs"
        breakpoints={[
          { maxWidth: "xl", cols: 4, spacing: "xs" },
          { maxWidth: "lg", cols: 3, spacing: "xs" },
          { maxWidth: "md", cols: 3, spacing: "xs" },
          { maxWidth: "sm", cols: 3, spacing: "xs" },
          { maxWidth: "xs", cols: 2, spacing: "xs" },
        ]}
      >
        {data.map((item, index) => {
          return (
            <Card
              key={index}
              shadow="sm"
              padding="sm"
              radius="lg"
              component={Link}
              to={`${item.link}`}
            >
              <Card.Section>
                <Image src={item.image} height={110} alt={item.name} />
              </Card.Section>

              <Text size="sm" mt="xs">
                {item.name}
              </Text>
              <Text size="sm" mt="xs">
                {item.price} руб
              </Text>
              {/* <Button mt="sm" variant="default" fullWidth>
                Выбрать
              </Button> */}
            </Card>
          );
        })}
      </SimpleGrid>
    </ScrollArea>
  );
};
export default AddList;
