import { useMemo, useState } from "react";
import {
  Grid,
  createStyles,
  Text,
  SegmentedControl,
  Group,
  Stack,
  Paper,
  Button,
} from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import { getDatabase, ref, child, get } from "firebase/database";
import useSortData from "../hooks/useSortData";
import AddList from "../components/AddList";
import ProductTitle from "../components/ProductTitle";
import Compound from "../components/Compound";
import { useDispatch } from "react-redux";
import { addOrder } from "../store/orderSlice";
import { useSelector } from "react-redux";
import { uid } from "uid";
import ProductPrice from "../components/Product/ProductPrice";
import ProductQuantity from "../components/Product/ProductQuantity";
import BackButton from "../components/BackButton";
import ProductImage from "../components/Product/ProductImage";

const categoriesWithAddList = [
  "sushi",
  "nigiri",
  "gynkan",
  "seti-sushi",
  "goryachie-sushi",
  "zapechenie-rolli",
  "friture",
  "pizza",
  "seti-pizza",
];

const createVariants = (arr, unit) => {
  const array = arr
    .map((item, index) => {
      return item.size !== 0
        ? { label: `${item.size} ${unit}`, value: `${index}` }
        : false;
    })
    .filter(Boolean);
	if (array.length === 1) {
		array[0].value = '0'
	}
  return array;
};

const useStyles = createStyles(() => ({
  wrapper: {
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
}));

const ProductPage = () => {
  const { productDataBase, dataCategories, category, addList } =
    useLoaderData();
  const quantity = useSelector((state) => state.quantity.quantity);
  const { classes } = useStyles();
  const dataVariants = Object.values(productDataBase.variant).filter(item => item.size !== 0);
  const arrA = useSortData(dataVariants, "size");
  const variants = useMemo(
    () => createVariants(arrA, productDataBase.unit),
    [arrA, productDataBase.unit]
  );
  const [variantValue, setVarianValue] = useState(variants[0].value);
  const dispatch = useDispatch();

   const arr = useMemo(
     () =>
       arrA
         .map((item, index) =>
           item.size !== 0
             ? {
                 label: `${item.size} ${productDataBase.unit}`,
                 value: `${index}`,
               }
             : null
         )
         .filter(Boolean),
     [arrA, productDataBase.unit]
   );
  const filteredArr = useMemo(() => variants.filter(Boolean), [variants]);
  return (
    <>
      <Grid className={classes.wrapper}>
        <Grid.Col md={6}>
          <BackButton />
          <ProductImage
            category={category}
            link={productDataBase.image}
            title={productDataBase.name}
            vertical={dataCategories.verticalImage}
          />
        </Grid.Col>
        <Grid.Col md={6}>
          <Paper shadow="xs" p="md" withBorder>
            <Stack>
              <Group position="apart">
                <ProductTitle title={productDataBase.name} />
                {dataCategories.delivery ? (
                  <Text>(Доставка не осуществляется)</Text>
                ) : undefined}
              </Group>
              <Compound compound={productDataBase.compound} />
              {categoriesWithAddList && addList && (
                <AddList
                  addList={addList}
                  variant={category.includes("pizza") ? "pizza" : undefined}
                />
              )}
              <Group>
                <Text>Размер: </Text>
                <SegmentedControl
                  size="md"
                  value={variantValue}
                  onChange={setVarianValue}
                  data={filteredArr}
                />
              </Group>
              <ProductPrice price={dataVariants[variantValue].price} />
              <Group position="apart">
                <ProductQuantity />
                <Button
                  variant="outline"
                  color="yellow"
                  onClick={() =>
                    dispatch(
                      addOrder({
                        item: productDataBase,
                        quantity: quantity,
                        label: arr[variantValue].label,
                        price: dataVariants[variantValue].price,
                        id: dataVariants[variantValue].id,
                        handlers: undefined,
                        orderUuid: uid(),
                        delive: dataCategories.delivery,
                      })
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
const getData = async (dbRef, path) => {
  const snapshot = await get(child(dbRef, path));
  if (!snapshot.exists()) {
    throw new Error("No data available");
  }
  return snapshot.val();
};

const productLoader = async ({ params }) => {
  const { category, product } = params;
  const dbRef = ref(getDatabase());

  try {
    const productDataBase = await getData(dbRef, `menu/${category}/${product}`);
    const dataCategories = await getData(dbRef, `/categories/${category}`);

    let addListObj;
    let addList;
    const categoriesWithAddList = [
      "sushi",
      "nigiri",
      "gynkan",
      "seti-sushi",
      "goryachie-sushi",
      "zapechenie-rolli",
      "friture",
      "pizza",
      "seti-pizza",
    ];

    if (categoriesWithAddList.includes(category)) {
      const addListPath = category.includes("pizza")
        ? "menu/dobavki"
        : "menu/soysi";
      addListObj = await getData(dbRef, addListPath);
      addList = Object.entries(addListObj).map(([key, value]) => ({
        ...value,
        id: key,
      }));
    }

    return { productDataBase, dataCategories, category, product, addList };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { ProductPage, productLoader };
