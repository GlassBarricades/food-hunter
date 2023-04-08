import {
  Indicator,
  useMantineTheme,
  ActionIcon,
  HoverCard,
  Text,
  Stack,
  Group,
  Image,
  Button,
  NumberInput,
  rem,
} from "@mantine/core";
import { ShoppingBag } from "tabler-icons-react";
import { Link } from "react-router-dom";

const Basket = ({ order }) => {
  const theme = useMantineTheme();

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
                  <Text>
                    {item.name} ({item.variantOrder})
                  </Text>
                  <NumberInput
                    value={item.quantity}
                    styles={{ input: { width: rem(64), height: rem(24) } }}
                  />
                  <Text>{item.quantity * item.priceOrder} руб</Text>
                </Group>
              );
            })}
            <Button component={Link} to="/order" variant="default">
              Перейти к оформлению заказа
            </Button>
          </Stack>
        ) : (
          <Text>В вашей корзине пока нет товаров :(</Text>
        )}
      </HoverCard.Dropdown>
    </HoverCard>
  );
};
export default Basket;
