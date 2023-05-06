import { useState, useEffect } from "react";
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
import useFetchDataOne from "../hooks/useFetchDataOne";
import useFetchData from "../hooks/useFetchData";

const useStyles = createStyles(() => ({
  wrapper: {
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
}));

const ProductPage = ({ data, variantProduct, onAdd, value, setValue }) => {
  const { category, product, kind, itemProduct } = useParams();
  const [dataProduct] = useFetchDataOne(`/menu/${category}/${product}`);
  const [dataVariants, loading] = useFetchData(
    `/menu/${category}/${product}/variant/`
  );
  const [variantValue, setVarianValue] = useState("0");
  const { classes } = useStyles();
  console.log(dataVariants);
  const arr = dataVariants.map((item, index) => {
    const obj = {
      label: `${item.size} ${category === "pizza" ? "см" : "шт"}`,
      value: `${index}`,
    };
    return obj;
  });

  // function filteredData() {
  //   if (variantProduct === "sushi") {
  //     const sushiData = dataProduct.filter((item) => {
  //       if (item.link === kind) {
  //         return item.items;
  //       }
  //     });
  //     const sushiItem = sushiData[0].items.filter((item) => {
  //       if (item.link === itemProduct) {
  //         return item;
  //       }
  //     });
  //     return sushiItem[0];
  //   } else {
  //     const dataCategory = dataProduct.filter((item) => {
  //       if (item.link === category) {
  //         return item;
  //       }
  //     });
  //     const dataItem = dataCategory[0].dataMenu.filter((item) => {
  //       if (item.link === product) {
  //         return item;
  //       }
  //     });
  //     return dataItem[0];
  //   }
  // }

  console.log(dataVariants);
  console.log(loading);

  return (
    <>
      {loading ? (
        <Text>Загрузка...</Text>
      ) : (
        <Grid className={classes.wrapper}>
          <Grid.Col md={6}>
            <Image
              radius="md"
              height={500}
              src={dataProduct.image}
              alt={dataProduct.name}
            />
          </Grid.Col>
          <Grid.Col md={6}>
            <Paper shadow="xs" p="md" withBorder>
              <Stack>
                <Title order={3}>{dataProduct.name}</Title>
                <Text>Состав: </Text>
                <List>{dataProduct.compound}</List>
                <Group>
                  <Text>Размер: </Text>
                  <SegmentedControl
                    value={variantValue}
                    onChange={setVarianValue}
                    data={arr}
                  />
                </Group>
                <Text>Цена: {dataVariants[variantValue].price} руб.</Text>
                {dataVariants[variantValue].weight !== 0 ? (
                  <Text>Вес: {dataVariants[variantValue].weight} гр.</Text>
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
                  {/* <Button
              variant="outline"
              color="yellow"
              onClick={() => onAdd(dataBase, selecteArr[variantValue].label, variant[variantValue].price)}
            >
              Добавить в корзину
            </Button> */}
                </Group>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      )}
    </>
  );
};
export default ProductPage;
