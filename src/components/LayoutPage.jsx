import { useState } from "react";
import { AppShell, Footer, useMantineTheme } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { HeaderSimple } from "./Header";
import NavBarApp from "./NavBarApp";

const App = ({ order, deleteOrder }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const linksMain = [
    {
      link: "/",
      name: "Главная",
    },
    {
      link: "/menu",
      name: "Меню",
    },
    // {
    //   link: "/admin",
    //   name: "Панель администратора",
    // },
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
      navbar={<NavBarApp links={linksMain} opened={opened} setOpened={setOpened} />}
      footer={
        <Footer height={60} p="md">
          food-hunter
        </Footer>
      }
      header={
        <HeaderSimple
          opened={opened}
          setOpened={setOpened}
          order={order}
          deleteOrder={deleteOrder}
        />
      }
    >
      <Outlet />
    </AppShell>
  );
};
export default App;
