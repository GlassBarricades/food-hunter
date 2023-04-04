import { useState } from "react";
import { AppShell, Footer, useMantineTheme } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { HeaderSimple } from "./Header";
import NavBarApp from "./NavBarApp";

const App = ({ order }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const links = [
    {
      link: "/",
      label: "Главная",
    },
    {
      link: "/menu",
      label: "Меню",
    },
  ];
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<NavBarApp links={links} opened={opened} />}
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <HeaderSimple
          links={links}
          opened={opened}
          setOpened={setOpened}
          order={order}
        />
      }
    >
      <Outlet />
    </AppShell>
  );
};
export default App;
