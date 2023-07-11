import {
  SimpleGrid,
  ScrollArea,
} from "@mantine/core";
import AddCard from "./AddCard";

const AddList = ({ addList, onAdd }) => {

  return (
    <ScrollArea h={250}>
      <SimpleGrid
        cols={5}
        spacing="xs"
        breakpoints={[
          { maxWidth: "xl", cols: 4, spacing: "xs" },
          { maxWidth: "lg", cols: 3, spacing: "xs" },
          { maxWidth: "md", cols: 3, spacing: "xs" },
          { maxWidth: "sm", cols: 3, spacing: "xs" },
          { maxWidth: "xs", cols: 2, spacing: "xs" },
        ]}
      >
        {addList.map((item) => {
          return (
            <AddCard key={item.uuid} item={item} onAdd={onAdd} />
          );
        })}
      </SimpleGrid>
    </ScrollArea>
  );
};
export default AddList;
