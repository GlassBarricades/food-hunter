import {
  Container,
  Group,
  Burger,
  Image,
  useMantineTheme,
} from "@mantine/core";
import { ThemeChange } from "./Theme-change";
import ContactsHeader from "./ContactsHeader";
import Basket from "./Basket";
import { useSelector, useDispatch } from "react-redux";
import { toggleNavBar } from "../store/navBarSlice";
import classes from "./Header.module.css";

export function Header({ open, toggle, admin }) {
  //   const opened = useSelector((state) => state.navBar.navBar);
  // const dispatch = useDispatch();
  const theme = useMantineTheme();

  return (
    <Container h="100%">
      <Group h="100%" justify="space-between">
        <Burger opened={open} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Image
          className={classes.img}
          w={60}
          src="https://i.ibb.co/GW6fC9X/logo1.png"
        />
        <ContactsHeader />
        <Group spacing="md" align="center" justify="center">
          <ThemeChange />
          {!admin ? <Basket /> : undefined}
        </Group>
      </Group>
    </Container>
  );
}
