import { Text, Box, BackgroundImage, Center, AppShell, Header } from "@mantine/core";
import HomeHeader from "./HomeHeader";

const HomeLayout = () => {
  return (
    <Box
      miw={"100vw"}
      mx="auto"
      sx={() => ({
        minHeight: "100vh",
      })}
    >
      <BackgroundImage
        src="https://i.ibb.co/YQG6Y99/td-DVh-YM-FA.jpg"
        radius="sm"
        mih={"100vh"}
      >
        <AppShell
          padding="md"
          header={
            <HomeHeader />
          }
        >
        </AppShell>
      </BackgroundImage>
    </Box>
  );
};
export default HomeLayout;
