import { Group, Text } from "@mantine/core";

const ProductPrice = ({price}) => {
  return (
    <Group position="left" spacing="xs" align="flex-end">
      <Text size="sm" mt="xs">
        Цена:
      </Text>
      <Text size="xl" mt="sm" fw={700}>
        {price}
      </Text>
      <Text size="sm" mt="xs">
        руб
      </Text>
    </Group>
  );
};

export default ProductPrice