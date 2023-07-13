import { useState, memo } from "react";
import {
  Grid,
  Image,
  createStyles,
  Text,
  SegmentedControl,
  Group,
  Stack,
  rem,
  NumberInput,
  Paper,
  Button,
} from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import { getDatabase, ref, child, get } from "firebase/database";
import useSortData from "../hooks/useSortData";
import AddList from "../components/AddList";
import ProductTitle from "../components/ProductTitle";
import Compound from "../components/Compound";
import { useLocalStorage } from '@mantine/hooks';

const useStyles = createStyles(() => ({
  wrapper: {
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
}));

const ProductPage = ({ onAdd }) => {
  const { productDataBase, category, addList } = useLoaderData();
  const [value, setValue] = useState(1);
  const { classes } = useStyles();
  const dataVariants = Object.values(productDataBase.variant);
  const arrA = useSortData(dataVariants, "size");
  const [variantValue, setVarianValue] = useState(createVariants(arrA));
  const arr = arrA.map((item, index) => {
    if (item.size !== 0) {
      const obj = {
        label: `${item.size} ${productDataBase.unit}`,
        value: `${index}`,
      };
      return obj;
    }
    return false;
  });
  const filteredArr = arr.filter((item) => {
    return item !== false ? item : undefined;
  });

  function createVariants(arr) {
    const arrData = arr.map((item, index) => {
      if (item.size !== 0) {
        const obj = {
          label: `${item.size} ${productDataBase.unit}`,
          value: `${index}`,
        };
        return obj;
      }
      return false;
    });
    const filteredArr = arrData.filter((item) => {
      return item !== false ? item : undefined;
    });
    return filteredArr[0].value;
  }

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
              <ProductTitle title={productDataBase.name} />
              <Compound compound={productDataBase.compound} />
              {category === "sushi" ||
              category === "nigiri" ||
              category === "gynkan" ||
              category === "sety-sushi" ||
              category === "goryachie-sushi" ||
              category === "friture" ||
              category === "pizza" ||
              category === "seti-pizza" ? (
                <AddList addList={addList} onAdd={onAdd} />
              ) : undefined}
              <Group>
                <Text>Размер: </Text>
                <SegmentedControl
                  size="md"
                  value={variantValue}
                  onChange={setVarianValue}
                  data={filteredArr}
                />
              </Group>
              <Group position="left" spacing="xs" align="flex-end">
                <Text size="sm" mt="xs">
                Цена:
                </Text>
                <Text size="xl" mt="sm" fw={700}>
                {dataVariants[variantValue].price}
                </Text>
                <Text size="sm" mt="xs">
                  руб
                </Text>
              </Group>
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
                  onClick={() =>
                    onAdd(
                      productDataBase,
                      arr[variantValue].label,
                      dataVariants[variantValue].price,
                      dataVariants[variantValue].id,
                      value,
                      setValue
                    )
                  }
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
  let addList;
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
  if (
    category === "sushi" ||
    category === "nigiri" ||
    category === "gynkan" ||
    category === "sety-sushi" ||
    category === "goryachie-sushi" ||
    category === "friture"
  ) {
    await get(child(dbRef, `menu/soysi`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = Object.values(snapshot.val());
          return data;
        } else {
          console.log("No data available");
        }
      })
      .then((data) => {
        addList = data;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  if (category === "pizza" || category === "seti-pizza") {
    await get(child(dbRef, `menu/dobavki`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = Object.values(snapshot.val());
          return data;
        } else {
          console.log("No data available");
        }
      })
      .then((data) => {
        addList = data;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return { productDataBase, category, product, addList };
};

export { ProductPage, productLoader };
