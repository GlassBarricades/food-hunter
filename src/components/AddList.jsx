import {
  SimpleGrid,
  Card,
  Image,
  Text,
  ScrollArea,
  ActionIcon,
  Group,
  Button,
  Badge,
  Indicator
} from "@mantine/core";
import {CirclePlus} from "tabler-icons-react";
import { useCounter } from '@mantine/hooks';

const AddList = ({ addList, onAdd }) => {
  const [count, handlers] = useCounter(0, { min: 0, max: 10 });
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
        {addList.map((item, index) => {
          return (
              <Card
              key={index}
              shadow="sm"
              padding="sm"
              radius="lg"
              onClick={handlers.increment}
            >
              <Indicator inline label={count} size={22} color="yellow" position="bottom-center">
              <Card.Section>
                <Image src={item.image} height={110} alt={item.name} />
              </Card.Section>
              </Indicator>
              <Group position="apart">
              <Text size="sm" mt="xs">
                {item.name}
              </Text>
              </Group>
              <Group position="apart">
                <Text size="sm" mt="xs">
                  {item.variant.one.price} руб
                </Text>
                <ActionIcon onClick={() =>
                    onAdd(
                      item,
                      item.variant.one.label,
                      item.variant.one.price,
                      item.variant.one.id,
                      count,
                      handlers
                    )
                  }>
                  <CirclePlus />
                </ActionIcon>
              </Group>
            </Card>
          );
        })}
      </SimpleGrid>
    </ScrollArea>
  );
};
export default AddList;
