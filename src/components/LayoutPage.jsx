import { useState } from "react";
import { AppShell, useMantineTheme } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import NavBarApp from "./NavBarApp";

const App = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

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
	  navbar={{
        width: { base: 200, md: 300, lg: 400 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    //   navbar={<NavBarApp opened={opened} setOpened={setOpened} />}
      footer={
        <AppShell.Footer height={60} p="md">
          food-hunter
        </AppShell.Footer>
      }
   header={{ height: { base: 50, md: 70 } }}
    >
		<AppShell.Header p='md'>
		<Header opened={opened} setOpened={setOpened} />
		</AppShell.Header>
		<AppShell.Navbar>
		<NavBarApp opened={opened} setOpened={setOpened} />
		</AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
export default App;
