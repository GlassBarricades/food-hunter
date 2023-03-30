import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { HeaderSimple } from "./components/Header";

const App = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const data = [
    {name: "Ланчи", link: "lanchi", img: "https://food-hunter.by/assets/cache_image/img/img-4907_130x90_4c2.jpg" },
    {name: "Суши", link: "lanchi", img: "https://food-hunter.by/assets/cache_image/img/sushi/rolyi_130x90_4c2.jpg" },
    {name: "Пиццы", link: "lanchi", img: "https://food-hunter.by/assets/cache_image/img/img-1726_130x90_4c2.jpg" },
    {name: "Салаты", link: "lanchi", img: "https://food-hunter.by/assets/cache_image/img/salat_130x90_4c2.jpg" },
    {name: "Гарниры, соусы", link: "lanchi", img: "https://food-hunter.by/assets/cache_image/img/777743674_130x90_4c2.jpg" },
    {name: "Десерты", link: "lanchi", img: "https://food-hunter.by/assets/cache_image/img/desert_130x90_4c2.jpg" },
    {name: "Лапша WOK", link: "lanchi", img: "https://food-hunter.by/assets/cache_image/img/lapsharis_130x90_4c2.jpg" },
    {name: "Драники", link: "lanchi", img: "https://food-hunter.by/assets/cache_image/img/jpg-1000-df3dbc4d-29ed-4778-8deb-0bde6110bf92_130x90_4c2.jpg" },
    {name: "Напитки", link: "lanchi", img: "https://food-hunter.by/assets/cache_image/img/65745745_130x90_4c2.jpg" },
    {name: "Закуски", link: "lanchi", img: "https://food-hunter.by/assets/cache_image/img/fri-nagensyi_130x90_4c2.jpg" },
    {name: "Супы", link: "lanchi", img: "https://food-hunter.by/assets/cache_image/img/sup_130x90_4c2.jpg" },
    {name: "Поке", link: "lanchi", img: "https://food-hunter.by/assets/cache_image//home/foodhunt/public_html/dsc-9853inst-1_130x90_4c2.jpg" },
  ]

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
    <BrowserRouter>
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
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            <Text>Application navbar</Text>
          </Navbar>
        }
        footer={
          <Footer height={60} p="md">
            Application footer
          </Footer>
        }
        header={
         <HeaderSimple links={links} opened={opened} setOpened={setOpened}/>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage data={data}/>} />
        </Routes>
        <Text>Resize app to see responsive navbar in action</Text>
      </AppShell>
    </BrowserRouter>
  );
}
export default App;