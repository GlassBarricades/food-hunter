import React, { useMemo } from 'react';
import { SimpleGrid, Title, Paper, Card, Group, createStyles } from "@mantine/core";
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

  const fullPrice = useMemo(() => {
    return order.reduce((sum, item) => sum + item.priceOrder * item.quantity, 0);
  }, [order]);

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
        <OrderBasketCard fullPrice={fullPrice} />
      </SimpleGrid>
    </>
  );
};
export default OrderPage;