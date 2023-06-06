import { useState } from "react";
import {
  Grid,
  SimpleGrid,
  Title,
  Paper,
  Card,
  Text,
  Group,
  Stack,
  Divider,
  TextInput,
  SegmentedControl,
  Textarea,
  createStyles,
  Image,
  ScrollArea,
  Table,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const useStyles = createStyles((theme) => ({
  formWrapper: {
    height: "100%",
  },
}));

const OrderPage = ({ order, productsArray, productsKolArr }) => {
  const { classes } = useStyles();
  const [variant, setVariant] = useState("2202");
  const [paymentType, setPaymentType] = useState("1");

  console.log(order);

  const form = useForm({
    initialValues: {
      product: [],
      product_kol: [],
      name: "",
      phone: "",
      street: "",
      house: "",
      apart: "",
      descr: "",
      tags: [],
    },
  });

  const rowsPrice = order.map((element) => (
    <tr key={element.name}>
      <td>
        {element.name} ({element.quantity})
      </td>
      <td>{element.quantity * element.priceOrder} руб</td>
    </tr>
  ));

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
              <form
                id="formOrder"
                onSubmit={form.onSubmit((values) => {
                  fetch("sendOrder.php", {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                       "Content-type":
                         "application/x-www-form-urlencoded; application/json; charset=UTF-8",
                    },
                    body: ('paramm=' + JSON.stringify(values)),
                  });
                })}
              >
                <Group>
                  <SegmentedControl
                    value={variant}
                    onChange={setVariant}
                    data={[
                      { label: "Доставка", value: "2202" },
                      { label: "Самовынос", value: "2294" },
                    ]}
                  />
                  {variant === "2294" ? (
                    <Text>Адрес: проспект Ленина, 15Б</Text>
                  ) : undefined}
                </Group>
                <SegmentedControl
                  mt="sm"
                  value={paymentType}
                  onChange={setPaymentType}
                  data={[
                    { label: "Наличными", value: "1" },
                    { label: "Картой", value: "2" },
                  ]}
                />
                <TextInput
                  placeholder="Имя"
                  label="Имя"
                  name="name"
                  {...form.getInputProps("name")}
                  withAsterisk
                />
                <TextInput
                  placeholder="Телефон"
                  label="Телефон"
                  {...form.getInputProps("phone")}
                  withAsterisk
                />
                <TextInput
                  placeholder="Улица"
                  label="Улица"
                  name="street"
                  {...form.getInputProps("street")}
                />
                <TextInput
                  placeholder="Дом"
                  label="Дом"
                  name="house"
                  {...form.getInputProps("house")}
                />
                <TextInput
                  placeholder="Квартира"
                  label="Квартира"
                  name="apart"
                  {...form.getInputProps("apart")}
                />
                <Textarea
                  label="Комментарий к заказу"
                  placeholder="Комментарий к заказу"
                  name="descr"
                  {...form.getInputProps("descr")}
                  autosize
                  minRows={2}
                  maxRows={4}
                />
                <Button
                mt="md"
                  type="submit"
                  onClick={() =>
                    form.setValues({
                      product: productsArray,
                      product_kol: productsKolArr,
                      tags: [variant],
                      pay: paymentType,
                    })
                  }
                >
                  Отправить заказ
                </Button>
              </form>
            </Card.Section>
          </Card>
        </Paper>
        <Grid gutter="md">
          <Grid.Col>
            <Paper radius="md">
              <Card withBorder shadow="sm" radius="md">
                <Card.Section withBorder inheritPadding py="xs">
                  <Group position="apart">
                    <Title order={5} weight={500}>
                      Корзина:
                    </Title>
                  </Group>
                </Card.Section>
                <Card.Section p="md">
                  <ScrollArea h={200}>
                    <Stack>
                      {order.map((item, index) => {
                        return (
                          <Group key={index} position="apart">
                            <Image width={80} src={item.image} />
                            <Text>
                              {item.name} ({item.variantOrder})
                            </Text>
                            <Text>{item.quantity} шт</Text>
                            <Text>{item.quantity * item.priceOrder} руб</Text>
                          </Group>
                        );
                      })}
                    </Stack>
                  </ScrollArea>
                </Card.Section>
              </Card>
            </Paper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Paper radius="md">
              <Card withBorder shadow="sm" radius="md">
                <Card.Section withBorder inheritPadding py="xs">
                  <Group position="apart">
                    <Title order={5} weight={500}>
                      Информация о заказе:
                    </Title>
                  </Group>
                </Card.Section>

                <Text mt="sm" color="dimmed" size="sm">
                  <Stack spacing={1}>
                    <Group position="apart">
                      <Text>Пицца пепперони (1шт)</Text>
                      <Text>12 руб</Text>
                    </Group>
                    <Divider my="sm" />
                    <Group position="apart">
                      <Text>Пицца пепперони (1шт)</Text>
                      <Text>12 руб</Text>
                    </Group>
                    <Divider my="sm" />
                    <Group position="apart">
                      <Text>Пицца пепперони (1шт)</Text>
                      <Text>12 руб</Text>
                    </Group>
                    <Divider my="sm" />
                    <Group position="apart">
                      <Text>Пицца пепперони (1шт)</Text>
                      <Text>12 руб</Text>
                    </Group>
                  </Stack>
                </Text>

                <Card.Section withBorder inheritPadding py="xs" mt="sm">
                  <Group position="apart">
                    <Text weight={500}>Итого:</Text>
                    <Text>48 руб</Text>
                  </Group>
                </Card.Section>
              </Card>
            </Paper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Paper radius="md">
              <Card withBorder shadow="sm" radius="md">
                <Card.Section withBorder inheritPadding py="xs">
                  <Group position="apart">
                    <Title order={5} weight={500}>
                      Информация о заказе:
                    </Title>
                  </Group>
                </Card.Section>
                <Table>
                  <tbody>{rowsPrice}</tbody>
                </Table>
                <Card.Section withBorder inheritPadding py="xs" mt="sm">
                  <Group position="apart">
                    <Text weight={500}>Итого:</Text>
                    <Text weight={500}>{fullPrice} руб</Text>
                  </Group>
                </Card.Section>
              </Card>
            </Paper>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </>
  );
};
export default OrderPage;
