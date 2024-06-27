import { AppShell, Burger, Group, Image, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NavBarApp from "./NavBarApp";
import { Outlet } from "react-router-dom";
import ContactsHeader from "./ContactsHeader";
import { ThemeChange } from "./Theme-change";
import { Header } from "./Header";

export function MainLayout() {
  const [opened, { toggle, close }] = useDisclosure();

  return (
    <AppShell
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Header open={opened} toggle={toggle}/>
        {/* <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Image w={60} src="https://i.ibb.co/GW6fC9X/logo1.png" />
          <ContactsHeader />
          <Group spacing="md" align="center">
            <ThemeChange />
            {!admin ? <Basket /> : undefined}
          </Group>
        </Group> */}
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavBarApp close={close}/>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
