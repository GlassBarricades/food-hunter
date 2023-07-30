import { memo } from "react";
import { Title } from "@mantine/core";

const ProductTitle = memo(({ title }) => {
  return <Title order={3}>{title}</Title>;
});
export default ProductTitle;
