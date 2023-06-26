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
  TextInput,
  SegmentedControl,
  Textarea,
  createStyles,
  Image,
  ScrollArea,
  Table,
  Button,
  Modal,
} from "@mantine/core";
import { useForm, hasLength, isNotEmpty } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  formWrapper: {
    height: "100%",
  },
}));

const OrderPage = ({ order, orderHandler, productsArray, productsKolArr }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useStyles();
  const [variant, setVariant] = useState("2202");
  const [paymentType, setPaymentType] = useState("1");
  const [table, setTable] = useState("4566");

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
    validate: {
      name: hasLength({ max: 50 }, "Имя должно быть до 50 символов длинной"),
      phone:
        isNotEmpty("Введите корректный номер телефона") &&
        hasLength({ min: 7, max: 15 }, "Введите корректный номер телефона"),
      descr: hasLength({ max: 100 }, "Длинна комментария до 100 символов"),
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

  function sendOrder() {
    form.setValues({
      product: productsArray,
      product_kol: productsKolArr,
      tags: variant === "234756345986459867459687495684" ? [table] : [variant],
      pay: paymentType,
    });
    form.reset();
    open();
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title=" " centered>
        <Text align="center" color="yellow" size={45}>
          Спасибо!
        </Text>
        <Text align="center" color="yellow" size={21}>
          Ваш заказ отправлен. Ожидайте звонок администратора.
        </Text>
      </Modal>
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
                     body: "paramm=" + JSON.stringify(values),
                   });
                   open();
                  orderHandler([])
                 })}
                 onReset={form.onReset}
              >
                <Group>
                  <SegmentedControl
                    value={variant}
                    onChange={setVariant}
                    data={[
                      { label: "Доставка", value: "2202" },
                      { label: "Самовынос", value: "2294" },
                      {
                        label: "За столом",
                        value: "234756345986459867459687495684",
                      },
                    ]}
                  />
                  {variant === "2294" ? (
                    <Text>Адрес: проспект Ленина, 15Б</Text>
                  ) : undefined}
                  {variant === "234756345986459867459687495684" ? (
                    <Stack spacing="xs">
                      <Text>Выбор столика:</Text>
                      <SegmentedControl
                        mt="sm"
                        value={table}
                        onChange={setTable}
                        data={[
                          { label: "Стол №1", value: "4566" },
                          { label: "Стол №2", value: "5052" },
                          { label: "Стол №3", value: "5053" },
                        ]}
                      />
                      <SegmentedControl
                        mt="sm"
                        value={table}
                        onChange={setTable}
                        data={[
                          { label: "Стол №4", value: "5054" },
                          { label: "Стол №5", value: "5055" },
                        ]}
                      />
                    </Stack>
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
                {variant === "2202" ? (
                  <>
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
                  </>
                ) : undefined}
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
                      tags: variant === "234756345986459867459687495684" ? [table] : [variant],
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
          <Grid.Col span={6}></Grid.Col>
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
