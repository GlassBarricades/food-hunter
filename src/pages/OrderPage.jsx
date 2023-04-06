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
} from "@mantine/core";

const OrderPage = () => {
  const theme = useMantineTheme();
  const [variant, setVariant] = useState("delivery");
  const [name, setName] = useState("");
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
            <Card.Section>
              <form>
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
                <TextInput
                  placeholder="Your name"
                  label="Full name"
                  withAsterisk
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
