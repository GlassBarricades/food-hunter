import { memo } from "react";
import { Text, List } from "@mantine/core";

const Compound = memo(({ compound }) => {
  console.log("compound");
  return (
    <>
      <Text>Состав: </Text>
      <List>{compound}</List>
    </>
  );
});

export default Compound;
