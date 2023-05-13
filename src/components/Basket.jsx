import {
  Indicator,
  useMantineTheme,
  ActionIcon,
  HoverCard,
  Text,
  Group,
  Image,
  Button,
  NumberInput,
  rem,
  Table,
} from "@mantine/core";
import { ShoppingBag } from "tabler-icons-react";
import { Link } from "react-router-dom";
import { Trash } from "tabler-icons-react";

const Basket = ({ order }) => {
  console.log(order)
  const theme = useMantineTheme();

  const rows = order.map((element) => (
    <tr key={element.name}>
      <td>
        <Image width={80} src={element.img} />
      </td>
      <td>{element.name}</td>
      <td>{element.variantOrder}</td>
      <td>
        <NumberInput
          value={element.quantity}
          styles={{ input: { width: rem(64), height: rem(24) } }}
        />
      </td>
      <td>{element.quantity * element.priceOrder} руб</td>
      <td>
      <ActionIcon variant="outline"><Trash size="1rem" /></ActionIcon>
      </td>
    </tr>
  ));

  return (
    <HoverCard width={700} shadow="md">
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
          <>
            <Table>
              <tbody>{rows}</tbody>
            </Table>
            <Group mt="sm" position="center">
              <Button component={Link} to="/order" variant="default">
                Перейти к оформлению заказа
              </Button>
            </Group>
          </>
        ) : (
          <Text>В вашей корзине пока нет товаров :(</Text>
        )}
      </HoverCard.Dropdown>
    </HoverCard>
  );
};
export default Basket;
