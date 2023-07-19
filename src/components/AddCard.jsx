import {
  Card,
  Image,
  Badge,
  Group,
  Text,
  ActionIcon,
  Button,
} from "@mantine/core";
import { CirclePlus, CircleMinus } from "tabler-icons-react";
import { useCounter } from "@mantine/hooks";

const AddCard = ({ item, onAdd }) => {
  const [count, handlers] = useCounter(0, { min: 0, max: 10 });
  return (
    <Card shadow="sm" padding="sm" radius="lg">
      <Card.Section>
        <Image src={item.image} height={110} alt={item.name} />
      </Card.Section>
      <Group position="apart">
        <Text size="sm" mt="xs">
          {item.name}
        </Text>
      </Group>
      <Group position="left" spacing="xs" align="flex-end">
      <Text size="xl" fw={700}>
        {count === 0 ? item.variant.one.price : (item.variant.one.price * count).toFixed(1)}
      </Text>
      <Text size="sm" mt="xs">
      руб
      </Text>
      </Group>
        <Group position="apart" spacing={1}>
          <ActionIcon onClick={handlers.decrement}>
            <CircleMinus />
          </ActionIcon>
          <Badge color="yellow" variant="outline">
            {count}
          </Badge>
          <ActionIcon onClick={handlers.increment}>
            <CirclePlus />
          </ActionIcon>
          {count === 0 ? <Button
            data-disabled
            variant="outline"
            color="yellow"
            size="xs"
            compact
          >
            Добавить
          </Button> : <Button
            variant="outline"
            color="yellow"
            size="xs"
            compact
            onClick={() =>
              onAdd(
                item,
                item.variant.one.label,
                item.variant.one.price,
                item.variant.one.id,
                count,
                handlers
              )
            }
          >
            Добавить
          </Button>}
        </Group>
    </Card>
  );
};
export default AddCard;
