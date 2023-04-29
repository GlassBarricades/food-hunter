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
import useFetchDataOne from "../hooks/useFetchDataOne";

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
  // const [dataBase] = useState(filteredData());
  // const [variantValue, setVarianValue] = useState(selecteArr[0].value);
  const { classes } = useStyles();

  console.log(dataProduct.variant)



  // const arr = compound.split(", ");

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
  

  return (
    <Grid className={classes.wrapper}>
      <Grid.Col md={6}>
        <Image radius="md" height={500} src={dataProduct.image} alt={dataProduct.name} />
      </Grid.Col>
      <Grid.Col md={6}>
        <Paper shadow="xs" p="md" withBorder>
          <Stack>
            <Title order={3}>{dataProduct.name}</Title>
            <Text>Состав: </Text>
            <List>
              {dataProduct.compound}
              {/* {arr.map((item, index) => {
                return <List.Item key={index}>{item}</List.Item>;
              })} */}
            </List>
            <Group>
              <Text>Размер: </Text>
              {/* <SegmentedControl
                value={variantValue}
                onChange={setVarianValue}
                data={selecteArr}
              /> */}
            </Group>
            {/* <Text>Цена: {variant[variantValue].price} руб.</Text>
            {variant[variantValue].weight !== 0 ? (
              <Text>Вес: {variant[variantValue].weight} гр.</Text>
            ) : undefined} */}
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
  );
};
export default ProductPage;
