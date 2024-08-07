import {
  Box,
  BackgroundImage,
  AppShell,
  LoadingOverlay,
} from "@mantine/core";
import HomeHeader from "./HomeHeader";
import HomeNavBar from "./HomeNavBar";
import useFetchImage from "../../hooks/useFetchImage";
import classes from "./HomeLayout.module.css";
import { useDisclosure } from "@mantine/hooks";

const HomeLayout = () => {
  const [opened, { toggle, close }] = useDisclosure();
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
          header={{ height: { base: 70, md: 110 } }}
          navbar={{
            width: { base: 200, md: 300, lg: 400 },
            breakpoint: "xl",
            collapsed: { desktop: true, mobile: !opened },
          }}
        >
          <AppShell.Header className={classes.header}>
            <HomeHeader open={opened} toggle={toggle} />
          </AppShell.Header>
          <AppShell.Navbar className={classes.navbar}>
            <HomeNavBar close={close}/>
          </AppShell.Navbar>
        </AppShell>
      </BackgroundImage>
    </Box>
  );
};
export default HomeLayout;
