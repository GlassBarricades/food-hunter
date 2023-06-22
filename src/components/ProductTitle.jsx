import { memo } from "react";
import { Title } from "@mantine/core";

const ProductTitle = memo(({ title }) => {
    console.log("render")
  return <Title order={3}>{title}</Title>;
});
export default ProductTitle;
