import {
  Indicator,
  useMantineTheme,
  ActionIcon,
  HoverCard,
  Text,
  Group,
  Image,
  Button,
  Table,
  useMantineColorScheme,
} from "@mantine/core";
import { ShoppingBag } from "tabler-icons-react";
import { Link } from "react-router-dom";
import { Trash } from "tabler-icons-react";
import { useSelector } from "react-redux";
import { removeOrder } from "../store/orderSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import classes from "./Basket.module.css";

const Basket = () => {
  const order = useSelector((state) => state.order.order);
  const [openBasket, setOpenBasket] = useState(false);
  const theme = useMantineTheme();
  const colorScheme = useMantineColorScheme();
  const dispatch = useDispatch();

  const rows = order.map((element) => (
    <tr key={element.orderUuid}>
      <td>
        <Image width={40} src={element.image} />
      </td>
      <td>
        {element.name} ({element.variantOrder})
      </td>
      <td>{element.quantity} шт.</td>
      <td>{element.quantity * element.priceOrder} руб</td>
      <td>
        <ActionIcon
          variant="outline"
          color={colorScheme.colorScheme === "dark" ? "yellow.5" : undefined}
          onClick={() => dispatch(removeOrder({ id: element.orderUuid }))}
        >
          <Trash size="1rem" />
        </ActionIcon>
      </td>
    </tr>
  ));

  return (
    <HoverCard shadow="md" initiallyOpened={openBasket}>
      <HoverCard.Target>
        <Indicator
          className={classes.indicator}
          inline
          label={order.length}
          size={16}
        >
          <ActionIcon variant="default">
            <ShoppingBag className={classes.icon} size={35} />
          </ActionIcon>
        </Indicator>
      </HoverCard.Target>
      <HoverCard.Dropdown className={classes.wrapper}>
        {order.length > 0 ? (
          <>
            <Table horizontalSpacing={5}>
              <tbody>{rows}</tbody>
            </Table>
            <Group mt="sm" position="center">
              <Button
                component={Link}
                to="/order"
                variant="outline"
                color="yellow"
                onClick={() => setOpenBasket(false)}
              >
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
