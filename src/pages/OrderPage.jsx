import { useState } from "react";
import {
  Grid,
  SimpleGrid,
  useMantineTheme,
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
} from "@mantine/core";

const OrderPage = () => {
  const theme = useMantineTheme();
  const [variant, setVariant] = useState("delivery");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [apartment, setApartment] = useState("");
  const [comment, setComment] = useState("");
  const [paymentType, setPaymentType] = useState("cash");
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
          <Card withBorder shadow="sm" radius="md">
            <Card.Section withBorder inheritPadding py="xs">
              <Group position="apart">
                <Title order={5} weight={500}>
                  Форма оформления заказа:
                </Title>
              </Group>
            </Card.Section>
            <Card.Section p="sm">
              <form>
                <Group>
                  <SegmentedControl
                    value={variant}
                    onChange={setVariant}
                    data={[
                      { label: "Доставка", value: "delivery" },
                      { label: "Самовынос", value: "pickup" },
                    ]}
                  />
                  {variant === "pickup" ? (
                    <Text>Адрес: проспект Ленина, 15Б</Text>
                  ) : undefined}
                </Group>
                <SegmentedControl
                    mt="sm"
                    value={paymentType}
                    onChange={setPaymentType}
                    data={[
                      { label: "Наличными", value: "cash" },
                      { label: "Картой", value: "card" },
                    ]}
                  />
                <TextInput
                  placeholder="Имя"
                  label="Имя"
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                  withAsterisk
                />
                <TextInput
                  placeholder="Телефон"
                  label="Телефон"
                  value={phone}
                  onChange={(e) => setPhone(e.currentTarget.value)}
                  withAsterisk
                />
                <TextInput
                  placeholder="Улица"
                  label="Улица"
                  value={street}
                  onChange={(e) => setStreet(e.currentTarget.value)}
                  withAsterisk
                />
                <TextInput
                  placeholder="Дом"
                  label="Дом"
                  value={house}
                  onChange={(e) => setHouse(e.currentTarget.value)}
                  withAsterisk
                />
                <TextInput
                  placeholder="Квартира"
                  label="Квартира"
                  value={apartment}
                  onChange={(e) => setApartment(e.currentTarget.value)}
                  withAsterisk
                />
                <Textarea
                  label="Комментарий к заказу"
                  placeholder="Комментарий к заказу"
                  value={comment}
                  onChange={(e) => setComment(e.currentTarget.value)}
                  autosize
                  minRows={2}
                  maxRows={4}
                />
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
        </Grid>
      </SimpleGrid>
    </>
  );
};
export default OrderPage;
