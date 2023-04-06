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
} from "@mantine/core";
import { ShoppingBag } from "tabler-icons-react";
import { Link } from "react-router-dom";

const Basket = ({ order }) => {
  const theme = useMantineTheme();

  let orderData = {
    secret:
      "dR8itATaDfrtYr4tdrSaTyTTtyGtDatGRrT8RB9eHnBsErNHFsHkQr78NDrbDKKf3seETdKss9KYnitTE47ef4bTstZY5z4TR7kz9ZRrZnaaAtT5iR9sFa92yZGnfz8Zshhs72HSaHTB5BsberyKstAQe64ks38H8e466AN67ty3YN435kBiG22NTR29EZHD4AyYZ7RSr9G9NA2FKnReaDSYeFTKrrafQz5BtGfHGQGhayQNHsSKTAy35b",
  };

  // function sendOrder() {
  //   fetch("https://app.frontpad.ru/api/index.php?get_products", {
  //     method: "POST",
  //     headers: {
  //       secret:
  //         "dR8itATaDfrtYr4tdrSaTyTTtyGtDatGRrT8RB9eHnBsErNHFsHkQr78NDrbDKKf3seETdKss9KYnitTE47ef4bTstZY5z4TR7kz9ZRrZnaaAtT5iR9sFa92yZGnfz8Zshhs72HSaHTB5BsberyKstAQe64ks38H8e466AN67ty3YN435kBiG22NTR29EZHD4AyYZ7RSr9G9NA2FKnReaDSYeFTKrrafQz5BtGfHGQGhayQNHsSKTAy35b",
  //     },
  //     body: JSON.stringify(orderData),
  //   }).then((res) => console.log(res));

  //   // let result = await response.json();
  //   // alert(result.message);
  // }

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
                  <Text>{item.quantity} шт</Text>
                  <Text>{item.quantity * item.priceOrder} руб</Text>
                </Group>
              );
            })}
            <Button component={Link} to="/order" variant="default">Перейти к оформлению заказа</Button>
          </Stack>
        ) : (
          <Text>В вашей корзине пока нет товаров :(</Text>
        )}
      </HoverCard.Dropdown>
    </HoverCard>
  );
};
export default Basket;
