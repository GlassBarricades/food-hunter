import {
  Container,
  Group,
  Burger,
  Image
} from "@mantine/core";
import { ThemeChange } from "./Theme-change";
import ContactsHeader from "./ContactsHeader";
import Basket from "./Basket";
import classes from "./Header.module.css";
import InstagramIcon from "./InstagramIcon";

export function Header({ open, toggle, admin }) {

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
          {!admin ? <InstagramIcon /> : undefined}
          <ThemeChange />
          {!admin ? <Basket /> : undefined}
        </Group>
      </Group>
    </Container>
  );
}
