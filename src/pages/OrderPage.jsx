import {
  Grid,
  SimpleGrid,
  Title,
  Paper,
  Card,
  Group,
  createStyles,
} from "@mantine/core";
import { useSelector } from "react-redux";
import OrderBasketCard from "../components/OrderBasketCard";
import OrderForm from "../components/Order/OrderForm";

const useStyles = createStyles((theme) => ({
  formWrapper: {
    height: "100%",
  },
}));

const OrderPage = () => {
  const order = useSelector((state) => state.order.order);
  const { classes } = useStyles();
  const arrPrice = order.map((item) => {
    return item.priceOrder * item.quantity;
  });
  const fullPrice = arrPrice.reduce(function (sum, elem) {
    return sum + elem;
  }, 0);

  return (
    <>
      <Title>Оформление заказа</Title>
      <SimpleGrid
        mt="md"
        cols={2}
        spacing="md"
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <Paper radius="md">
          <Card
            className={classes.formWrapper}
            withBorder
            shadow="sm"
            radius="md"
          >
            <Card.Section withBorder inheritPadding py="xs">
              <Group position="apart">
                <Title order={5} weight={500}>
                  Форма оформления заказа:
                </Title>
              </Group>
            </Card.Section>
            <Card.Section p="sm">
				<OrderForm />
            </Card.Section>
          </Card>
        </Paper>
        <Grid gutter="md">
          <Grid.Col>
            <OrderBasketCard fullPrice={fullPrice} />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </>
  );
};
export default OrderPage;
