import {
  Container,
  Group,
  Burger,
  useMantineTheme,
  Anchor,
  Image,
  Paper,
  AppShellHeader,
} from "@mantine/core";
import { NavLink } from "react-router-dom";
import ContactsHeader from "../ContactsHeader";
import { useDispatch, useSelector } from "react-redux";
import { toggleHomeNavBar } from "../../store/navBarSlice";
import classes from './HomeHeader.module.css';

// const useStyles = createStyles((theme) => ({
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     height: "100%",
//     width: "100%",
//     [theme.fn.smallerThan('md')]: {
//       justifyContent: "end",
//     },
//   },

//   links: {
//     [theme.fn.smallerThan("xs")]: {
//       display: "none",
//     },
//   },

//   burger: {
//     backgroundColor: theme.colors.yellow[4]
//   },

//   link: {
//     display: "block",
//     lineHeight: 1,
//     padding: "8px 12px",
//     borderRadius: theme.radius.sm,
//     textDecoration: "none",
//     textTransform: "uppercase",
//     color: theme.colors.yellow[7],
//     fontSize: theme.fontSizes.md,
//     fontWeight: 700,
//     textShadow: "1px 1px 2px black",

//     "&:hover": {
//       backgroundColor:
//         theme.colorScheme === "dark"
//           ? theme.colors.dark[6]
//           : theme.colors.gray[0],
//     },
//   },

//   linkActive: {
//     "&, &:hover": {
//       backgroundColor: theme.fn.variant({
//         variant: "light",
//         color: theme.primaryColor,
//       }).background,
//       color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
//         .color,
//     },
//   },
// }));

const HomeHeader = () => {
  const theme = useMantineTheme();
  const opened = useSelector((state) => state.navBar.homeNavBar);
  const dispatch = useDispatch();
  console.log(classes)
  // const { classes } = useStyles();

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
    <AppShellHeader
      height={{ base: 60, md: 110 }}
      p="md"
      styles={() => ({
        root: { backgroundColor: "transparent" },
      })}
    >
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        {/* <MediaQuery largerThan="md" styles={{ display: "none" }}> */}
          <Burger
            className={classes.burger}
            opened={opened}
            hiddenFrom="sm"
            onClick={() => dispatch(toggleHomeNavBar())}
            size="lg"
            color={theme.colors.dark[6]}
            mr="xl"
          />
        {/* </MediaQuery> */}

        <Container className={classes.header}>
            <Image width={60} src="https://i.ibb.co/GW6fC9X/logo1.png" />
          {/* <MediaQuery smallerThan="md" styles={{ display: "none" }}> */}
            <Group className={classes.items}>{items}</Group>
          {/* </MediaQuery> */}
          <Group spacing="md" align="center">
            {/* <MediaQuery smallerThan="md" styles={{ display: "none" }}> */}
              <Paper p="xs">
                <ContactsHeader />
              </Paper>
            {/* </MediaQuery> */}
          </Group>
        </Container>
      </div>
    </AppShellHeader>
  );
};
export default HomeHeader;
