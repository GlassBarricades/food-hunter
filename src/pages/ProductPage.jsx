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
} from "@mantine/core";
import { useParams } from "react-router-dom";

const useStyles = createStyles(() => ({
  wrapper: {
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
}));

const ProductPage = ({ data }) => {
  const { category, product } = useParams();
  const [value, setValue] = useState(1);
  const [dataBase] = useState(filteredData());
  const { name, img, compound, variant } = dataBase;
  const [selecteArr] = useState(selectArrData());
  const [variantValue, setVarianValue] = useState(selecteArr[0].value);
  const { classes } = useStyles();
  function filteredData() {
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
  function selectArrData() {
    const arr = variant.map((item, index) => {
      const obj = { label: `${item.size} шт`, value: `${index}` };
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
        <Stack>
          <Title order={3}>{name}</Title>
          <Text>{compound}</Text>
          <Group>
            <Text>Размер: </Text>
            <SegmentedControl
              value={variantValue}
              onChange={setVarianValue}
              data={selecteArr}
            />
          </Group>
          <Text>Цена: {variant[variantValue].price} руб.</Text>
          <Text>Цена: {variant[variantValue].weight} гр.</Text>
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
        </Stack>
      </Grid.Col>
    </Grid>
  );
};
export default ProductPage;
