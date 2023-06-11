import {
  Title,
  Anchor,
  useMantineTheme,
  createStyles,
  Navbar,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { Link } from "react-router-dom";

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

const NavBarApp = ({ links, opened, admin, setOpened }) => {
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();

  const items = links.map((link, indx) => {
    return (
      <Anchor
        component={Link}
        to={link.link}
        key={indx}
        onClick={() => setOpened(false)}
      >
        {link.name}
      </Anchor>
    );
  });
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      {admin ? (
        <>
          <Anchor component={Link} to="category" className={classes.link}>
            Категории
          </Anchor>
          <Anchor
            component={Link}
            to="category-alcohol"
            className={classes.link}
          >
            Категории Алкоголь
          </Anchor>
        </>
      ) : undefined}
      {items}
    </Navbar>
  );
};
export default NavBarApp;
