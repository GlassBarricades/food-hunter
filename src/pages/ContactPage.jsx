import {
  Title,
  SimpleGrid,
  Group,
  ActionIcon,
  rem,
  useMantineTheme,
} from "@mantine/core";
import {
  BrandTwitter,
  BrandYoutube,
  BrandInstagram,
} from "tabler-icons-react";
import { ContactIconsList } from "../components/ContactIcon";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import classes from './ContactPage.module.css';

// const useStyles = createStyles((theme) => ({
//   wrapper: {
//     boxSizing: "border-box",
//     backgroundColor:
//       theme.colorScheme === "dark"
//         ? theme.colors.dark[5]
//         : theme.colors.gray[1],
//     borderRadius: theme.radius.md,
//     padding: `calc(${theme.spacing.xl} * 2.5)`,
//     minHeight: "100%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-around",
//     [theme.fn.smallerThan("sm")]: {
//       padding: `calc(${theme.spacing.xl} * 1.5)`,
//     },
//   },

//   title: {
//     fontFamily: `Greycliff CF, ${theme.fontFamily}`,
//     color: theme.white,
//     lineHeight: 1,
//   },

//   description: {
//     color: theme.colorScheme === "dark" ? theme.white : theme.black,
//     maxWidth: rem(500),
//     [theme.fn.smallerThan("sm")]: {
//       maxWidth: "100%",
//     },
//   },

//   form: {
//     backgroundColor:
//       theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.white,
//     padding: theme.spacing.xl,
//     borderRadius: theme.radius.md,
//     boxShadow: theme.shadows.lg,
//   },

//   social: {
//     color: theme.white,

//     "&:hover": {
//       color: theme.colors[theme.primaryColor][1],
//     },
//   },

//   input: {
//     backgroundColor:
//       theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.white,
//     borderColor:
//       theme.colorScheme === "dark" ? theme.colors.yellow[6] : theme.black,
//     color: theme.colorScheme === "dark" ? theme.colors.yellow[6] : theme.black,

//     "&::placeholder": {
//       color: theme.colors.gray[5],
//     },
//   },

//   inputLabel: {
//     color: theme.colorScheme === "dark" ? theme.colors.yellow[6] : theme.black,
//   },

//   control: {
//     backgroundColor: theme.colors[theme.primaryColor][6],
//   },
// }));

const social = [BrandTwitter, BrandYoutube, BrandInstagram];

const ContactPage = () => {
  const theme = useMantineTheme();
  // const { classes } = useStyles();

  const icons = social.map((Icon, index) => (
    <ActionIcon
      key={index}
      size={28}
      className={classes.social}
      variant="transparent"
    >
      <Icon size="1.4rem" stroke={1.5} />
    </ActionIcon>
  ));

  return (
    <div className={classes.wrapper}>
      <SimpleGrid
        spacing={50}
        cols={{ base: 1, sm: 2 }}
      >
        <div>
          <Title mb="xl">Контактная информация</Title>

          <ContactIconsList variant="white" />

          <Group mt="xl">{icons}</Group>
        </div>
        <div className={classes.form}>
          <YMaps>
            <Map
              defaultState={{ center: [54.09681, 28.295054], zoom: 17 }}
              width="100%"
              height="100%"
            >
              <Placemark geometry={[54.09681, 28.295054]} />
            </Map>
          </YMaps>
        </div>
      </SimpleGrid>
    </div>
  );
};

export default ContactPage;
