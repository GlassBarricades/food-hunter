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
} from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import { getDatabase, ref, child, get } from "firebase/database";
// import AddList from "../components/AddList";

const useStyles = createStyles(() => ({
  wrapper: {
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
}));

const ProductPage = ({ onAdd }) => {
  const { productDataBase, category } = useLoaderData();
   const [variantValue, setVarianValue] = useState("0");
   const [value, setValue] = useState(1);
   const { classes } = useStyles();
   const dataVariants = Object.values(productDataBase.variant)
   const arr = dataVariants.map((item, index) => {
     const obj = {
       label: `${item.size} ${category === "pizza" ? "см" : "шт"}`,
       value: `${index}`,
     };
     return obj;
   });

   const filteredArr = arr.filter((item, index) => {
    if (item.label != "0 шт") {
      return item
    }
   })

  return (
    <>
      <Grid className={classes.wrapper}>
        <Grid.Col md={6}>
          <Image
            radius="md"
            height={500}
            src={productDataBase.image}
            alt={productDataBase.name}
          />
        </Grid.Col>
        <Grid.Col md={6}>
          <Paper shadow="xs" p="md" withBorder>
            <Stack>
              <Title order={3}>{productDataBase.name}</Title>
              <Text>Состав: </Text>
              <List>{productDataBase.compound}</List>
              {/* <AddList /> */}
              <Group>
                <Text>Размер: </Text>
                <SegmentedControl
                size="md"
                  value={variantValue}
                  onChange={setVarianValue}
                  data={filteredArr}
                />
              </Group>
              <Text>Цена: {dataVariants[variantValue].price} руб.</Text>
              <Group position="apart">
                <Group spacing={5}>
                  <Text>Количество: </Text>
                  <NumberInput
                    value={value}
                    onChange={setValue}
                    max={10}
                    min={0}
                    styles={{ input: { width: rem(64), height: rem(24) } }}
                  />
                </Group>
                <Button
               variant="outline"
               color="yellow"
               onClick={() => onAdd(productDataBase, arr[variantValue].label, dataVariants[variantValue].price, dataVariants[variantValue].id, value, setValue)}
             >
               Добавить в корзину
             </Button>
              </Group>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </>
  );
};

const productLoader = async ({ params }) => {
  const category = params.category;
  const product = params.product;
  const dbRef = ref(getDatabase());
  let productDataBase;
  await get(child(dbRef, `menu/${category}/${product}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        return data;
      } else {
        console.log("No data available");
      }
    })
    .then((data) => {
      productDataBase = data;
    })
    .catch((error) => {
      console.error(error);
    });
  return { productDataBase, category, product };
};

export { ProductPage, productLoader };
