import {
  Group,
  Burger,
  useMantineTheme,
  Anchor,
  Image,
  Paper,
  Container,
} from "@mantine/core";
import { NavLink } from "react-router-dom";
import ContactsHeader from "../ContactsHeader";
import classes from './HomeHeader.module.css';

const HomeHeader = ({ open, toggle }) => {
  const theme = useMantineTheme();

  const linksMain = [
    {
      link: "/",
      name: "Главная",
    },
    {
      link: "/menu",
      name: "Меню",
    },
    {
			link: '/delivery',
			name: 'Доставка'
		},
    {
      link: "/stock",
      name: "Акции",
    },
    {
      link: "/contacts",
      name: "Контакты",
    },
  ];

  const items = linksMain.map((link, indx) => {
    return (
      <Anchor
        component={NavLink}
        to={link.link}
        key={indx}
        className={classes.link}
      >
        {link.name}
      </Anchor>
    );
  });

  return (
      <Container fluid className={classes.headerWrap}>
        <Group className={classes.headerInner}>
          <Burger
            className={classes.burger}
            opened={open} onClick={toggle}
            // hiddenFrom="sm"
            size="lg"
            color={theme.colors.dark[6]}
            mr="xl"
          />

            <Image w={70} src="https://i.ibb.co/GW6fC9X/logo1.png" />
            <Group className={classes.items}>{items}</Group>
          <Group spacing="md" align="center" className={classes.contactsHeaderWrap}>
              <Paper p="xs">
                <ContactsHeader />
              </Paper>
          </Group>
        </Group>
        </Container>
  );
};
export default HomeHeader;
