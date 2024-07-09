import { Center, Group, Paper } from "@mantine/core";
import InstagramIcon from "./InstagramIcon";
import { ThemeChange } from "./Theme-change";

const IconsGroupAction = () => {
    return (
        <Paper py="md">
          <Center h="100%">
            <Group>
              <InstagramIcon />
              <ThemeChange />
            </Group>
          </Center>
        </Paper>
    )
}
export default IconsGroupAction;