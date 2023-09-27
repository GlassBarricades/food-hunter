import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  MediaQuery,
  useMantineTheme,
  Title,
  Anchor,
  Image,
  Box,
  Paper,
} from "@mantine/core";
import { ThemeChange } from "../Theme-change";
import { NavLink } from "react-router-dom";
import ContactsHeader from "../ContactsHeader";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    textTransform: "uppercase",
    color: theme.colors.yellow[7],
    fontSize: theme.fontSizes.md,
    fontWeight: 700,
    textShadow: "1px 1px 2px black",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

const HomeHeader = ({ opened, setOpened }) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();

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
    <Header
      height={{ base: 60, md: 110 }}
      p="md"
      styles={() => ({
        root: { backgroundColor: "transparent" },
      })}
    >
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <MediaQuery largerThan="md" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>

        <Container className={classes.header}>
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Image width={60} src="https://i.ibb.co/GW6fC9X/logo1.png" />
          </MediaQuery>
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Group>{items}</Group>
          </MediaQuery>
          <Group spacing="md" align="center">
            <Paper p="xs">
              <ContactsHeader />
            </Paper>
          </Group>
        </Container>
      </div>
    </Header>
  );
};
export default HomeHeader;
