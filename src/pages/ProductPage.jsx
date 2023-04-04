import { useState } from "react";
import {
  Grid,
  Image,
  Title,
  createStyles,
  Text,
  SegmentedControl,
  Group,
  Stack,
  rem,
  NumberInput,
  List,
  Paper,
  Button,
  useMantineTheme,
} from "@mantine/core";
import { useParams } from "react-router-dom";

const useStyles = createStyles(() => ({
  wrapper: {
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
}));

const ProductPage = ({ data, variantProduct, onAdd, value, setValue }) => {
  const theme = useMantineTheme();
  const { category, product, kind, itemProduct } = useParams();
  const [dataBase] = useState(filteredData());
  const { name, img, compound, variant } = dataBase;
  const [selecteArr] = useState(selectArrData());
  const [variantValue, setVarianValue] = useState(selecteArr[0].value);
  const { classes } = useStyles();

  const arr = compound.split(", ");

  function filteredData() {
    if (variantProduct === "sushi") {
      const sushiData = data.filter((item) => {
        if (item.link === kind) {
          return item.items;
        }
      });
      const sushiItem = sushiData[0].items.filter((item) => {
        if (item.link === itemProduct) {
          return item;
        }
      });
      return sushiItem[0];
    } else {
      const dataCategory = data.filter((item) => {
        if (item.link === category) {
          return item;
        }
      });
      const dataItem = dataCategory[0].dataMenu.filter((item) => {
        if (item.link === product) {
          return item;
        }
      });
      return dataItem[0];
    }
  }

  function selectArrData() {
    const arr = variant.map((item, index) => {
      const obj = {
        label: `${item.size} ${category === "pizza" ? "см" : "шт"}`,
        value: `${index}`,
      };
      return obj;
    });
    return arr;
  }
  

  return (
    <Grid className={classes.wrapper}>
      <Grid.Col md={6}>
        <Image radius="md" height={500} src={img} alt={name} />
      </Grid.Col>
      <Grid.Col md={6}>
        <Paper shadow="xs" p="md" withBorder>
          <Stack>
            <Title order={3}>{name}</Title>
            <Text>Состав: </Text>
            <List>
              {arr.map((item, index) => {
                return <List.Item key={index}>{item}</List.Item>;
              })}
            </List>
            <Group>
              <Text>Размер: </Text>
              <SegmentedControl
                value={variantValue}
                onChange={setVarianValue}
                data={selecteArr}
              />
            </Group>
            <Text>Цена: {variant[variantValue].price} руб.</Text>
            {variant[variantValue].weight !== 0 ? (
              <Text>Вес: {variant[variantValue].weight} гр.</Text>
            ) : undefined}
            <Group position="apart">
              <Group spacing={5}>
                <Text>Количество: </Text>
                <NumberInput
                  value={value}
                  onChange={(val) => setValue(val)}
                  max={10}
                  min={0}
                  styles={{ input: { width: rem(64), height: rem(24) } }}
                />
              </Group>
              <Button
                variant="outline"
                color="yellow"
                onClick={() => onAdd(dataBase, selecteArr[variantValue].label, variant[variantValue].price)}
              >
                Добавить в корзину
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Grid.Col>
    </Grid>
  );
};
export default ProductPage;
