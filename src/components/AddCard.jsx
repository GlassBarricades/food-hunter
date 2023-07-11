import { Card, Image, Indicator, Group, Text, ActionIcon } from "@mantine/core";
import {CirclePlus} from "tabler-icons-react";
import { useCounter } from '@mantine/hooks';

const AddCard = ({ item, onAdd }) => {
    const [count, handlers] = useCounter(0, { min: 0, max: 10 });
    return (
        <Card
              shadow="sm"
              padding="sm"
              radius="lg"
              onClick={handlers.increment}
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
    )
}
export default AddCard;