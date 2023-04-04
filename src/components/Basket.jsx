import {
  Indicator,
  useMantineTheme,
  ActionIcon,
  HoverCard,
  Text,
  Stack,
  Group,
  Image,
} from "@mantine/core";
import { ShoppingBag } from "tabler-icons-react";

const Basket = ({ order }) => {
  const theme = useMantineTheme();
  console.log(order.lenght);
  return (
    <HoverCard width={580} shadow="md">
      <HoverCard.Target>
        <Indicator
          color={
            theme.colorScheme === "dark" ? theme.colors.gray[6] : theme.black
          }
          inline
          label={order.length}
          size={16}
        >
          <ActionIcon variant="default">
            <ShoppingBag
              color={
                theme.colorScheme === "dark"
                  ? theme.colors.yellow[5]
                  : theme.black
              }
              size={35}
            />
          </ActionIcon>
        </Indicator>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        {order.length > 0 ? (
          <Stack>
            {order.map((item, index) => {
              return (
                <Group key={index}>
                  <Image width={80} src={item.img} />
                  <Text>{item.name} ({item.variantOrder})</Text>
                  <Text>{item.quantity} шт</Text>
                  <Text>{item.priceOrder} руб</Text>
                </Group>
              );
            })}
          </Stack>
        ) : (
          <Text>В вашей корзине пока нет товаров :(</Text>
        )}
      </HoverCard.Dropdown>
    </HoverCard>
  );
};
export default Basket;
