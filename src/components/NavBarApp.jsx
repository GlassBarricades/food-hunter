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

const NavBarApp = ({ links, opened, admin }) => {
  const theme = useMantineTheme();
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
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      {admin ? (
        <Anchor component={Link} to="category" className={classes.link}>
          Категории
        </Anchor>
      ) : undefined}
      {items}
    </Navbar>
  );
};
export default NavBarApp;
