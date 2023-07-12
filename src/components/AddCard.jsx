import { Card, Image, Indicator, Group, Text, ActionIcon } from "@mantine/core";
import {CirclePlus, CircleMinus, ShoppingBag} from "tabler-icons-react";
import { useCounter } from '@mantine/hooks';

const AddCard = ({ item, onAdd }) => {
    const [count, handlers] = useCounter(1, { min: 1, max: 10 });
    return (
        <Card
              shadow="sm"
              padding="sm"
              radius="lg"
            >
              <Card.Section>
                <Image src={item.image} height={110} alt={item.name} />
              </Card.Section>
              <Indicator label={count} size={22} color="yellow">
              <Group position="apart">
              <Text size="sm" mt="xs">
                {item.name}
              </Text>
              </Group>
              </Indicator>
              <Text size="sm" mt="xs">
                  {item.variant.one.price * count} руб
                </Text>
              <Group position="apart">
                <ActionIcon onClick={handlers.decrement}>
                  <CircleMinus />
                </ActionIcon>
                <ActionIcon onClick={handlers.increment}>
                  <CirclePlus />
                </ActionIcon>
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
                  <ShoppingBag />
                </ActionIcon>
              </Group>
            </Card>
    )
}
export default AddCard;