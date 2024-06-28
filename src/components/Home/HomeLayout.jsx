import {
  Box,
  BackgroundImage,
  AppShell,
  Paper,
  useMantineTheme,
  LoadingOverlay,
} from "@mantine/core";
import HomeHeader from "./HomeHeader";
import HomeNavBar from "./HomeNavBar";
import { BrandInstagram } from "tabler-icons-react";
import useFetchImage from "../../hooks/useFetchImage";
import classes from "./HomeLayout.module.css";

const HomeLayout = () => {
  const theme = useMantineTheme();
  const { url } = useFetchImage("https://i.ibb.co/tZy6t7D/Gt-Z61-HH2-C9-M.jpg");

  return (
    <Box
      miw={"100vw"}
      mx="auto"
      sx={() => ({
        minHeight: "100vh",
      })}
    >
      <LoadingOverlay
        visible={!url}
        loaderProps={{ size: "xl", color: "orange" }}
      />
      <BackgroundImage src={url} radius="sm" mih={"100vh"}>
        <AppShell
          className={classes.layoutWrap}
          padding="md"
          header={{ height: { base: 60, md: 110 } }}
          // navbar={<HomeNavBar />}
        >
          <AppShell.Header className={classes.header}>
            <HomeHeader />
          </AppShell.Header>
          <HomeNavBar />
          <AppShell.Main>
            <Paper
              component="a"
              href="https://www.instagram.com/food_hunter.by/?igsh=MXN4dmpoamNkc3h2eA%3D%3D"
              target="_blank"
              className={classes.socWrap}
            >
              <BrandInstagram
                color={
                  theme.colorScheme === "dark"
                    ? theme.colors.yellow[5]
                    : theme.black
                }
              />
            </Paper>
          </AppShell.Main>
        </AppShell>
      </BackgroundImage>
    </Box>
  );
};
export default HomeLayout;
