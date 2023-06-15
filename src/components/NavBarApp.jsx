import {
  Title,
  Anchor,
  useMantineTheme,
  createStyles,
  Navbar,
} from "@mantine/core";
import { NavLink } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  links: {
    [theme.fn.smallerThan("xs")]: {
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
  active: {
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

const NavBarApp = ({ links, opened, admin, setOpened }) => {
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();

  const items = links.map((link, indx) => {
    return (
      <Anchor
        component={NavLink}
        to={link.link}
        key={indx}
        className={classes.link}
        onClick={() => setOpened(false)}
      >
        {link.name}
      </Anchor>
    );
  });
  return (
    <Navbar p="md" hiddenBreakpoint="md" hidden={!opened} width={{ md: 200 }}>
      {admin ? (
        <>
          <Anchor
            component={NavLink}
            to="category/categories"
            className={classes.link}
          >
            Категории
          </Anchor>
          <Anchor
            component={NavLink}
            to="category/categories-alcohol"
            className={classes.link}
          >
            Категории Алкоголь
          </Anchor>
          <Anchor
            component={NavLink}
            to="category/categories-napitki"
            className={classes.link}
          >
            Категории Напитков
          </Anchor>
          <Anchor component={NavLink} to="units" className={classes.link}>
            Единицы измерения
          </Anchor>
        </>
      ) : undefined}
      {items}
    </Navbar>
  );
};
export default NavBarApp;
