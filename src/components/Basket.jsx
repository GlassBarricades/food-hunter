import { Indicator, useMantineTheme } from "@mantine/core";
import { ShoppingCart } from "tabler-icons-react";

const Basket = () => {
  const theme = useMantineTheme();
  return (
    <Indicator
      color={
        theme.colorScheme === "dark" ? theme.colors.yellow[5] : theme.black
      }
      inline
      label="0"
      size={16}
    >
      <ShoppingCart
        color={
          theme.colorScheme === "dark" ? theme.colors.yellow[5] : theme.black
        }
        size={35}
      />
    </Indicator>
  );
};
export default Basket;
