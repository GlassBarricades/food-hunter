import { useState } from "react";
import { useLocalStorage } from "@mantine/hooks";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Anchor,
  MediaQuery,
  Image,
  Drawer,
  useMantineTheme,
  Text
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ThemeChange } from "./Theme-change";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    width: "100%"
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
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

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

export function HeaderSimple({ links, opened, setOpened }) {
  const theme = useMantineTheme();
  //const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();
  const [active, setActive] = useLocalStorage({
    key: "active-link",
    defaultValue: links[0].link,
    getInitialValueInEffect: true,
  });

  const items = links.map((link) => (
    <Anchor
      component={Link}
      to={link.link}
      key={link.label}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={() => {
        setActive(link.link);
      }}
    >
      {link.label}
    </Anchor>
  ));

  return (
    <Header height={{ base: 50, md: 70 }} p="md">
    <div
      style={{ display: "flex", alignItems: "center", height: "100%" }}
    >
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
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
      <Image width={60} src="https://food-hunter.by/img/logo.png" />
      </MediaQuery>
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
         <Group spacing={5} className={classes.links}>
           {items}
         </Group>
         </MediaQuery>
         <ThemeChange />
       </Container>
    </div>
  </Header>
    // <Header
    //   height={60}
    //   styles={() => ({
    //     root: {
    //       position: "sticky",
    //     },
    //   })}
    // >
    //   <Container className={classes.header}>
    //     <Image
    //       src={"https://aleksann.by/wp-content/themes/oceanic/images/logo.png"}
    //       width={130}
    //     />
    //     <Group spacing={5} className={classes.links}>
    //       {items}
    //     </Group>
    //     <ThemeChange />
    //     <Burger
    //       opened={opened}
    //       onClick={toggle}
    //       className={classes.burger}
    //       size="sm"
    //     />
    //   </Container>
    //   <Drawer opened={opened} onClose={close} title="Меню">
    //     123
    //   </Drawer>
    // </Header>
  );
}
