import { useState } from "react";
import { AppShell, Footer, useMantineTheme } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { HeaderSimple } from "./components/Header";
import NavBarApp from "./components/NavBarApp";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";

const App = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const data = [
    {
      name: "Ланчи",
      dataMenu: [
        {
          name: "Ланч #1",
          link: "lanch-1",
          img: "https://thumbs.dreamstime.com/b/%D0%B0%D0%B7%D0%B8%D0%B0%D1%82%D1%81%D0%BA%D0%B8%D0%B5-%D1%81%D0%BF%D0%B8%D1%81%D0%BA%D0%B8-%D0%B8-%D1%83%D0%BA%D1%80%D0%B0%D1%81%D1%8C%D1%82%D0%B5-%D1%81%D1%83%D1%88%D0%B8-%D1%81%D1%83%D0%BF-%D0%BD%D0%B0%D0%B1%D0%BE%D1%80%D0%B0-%D0%BF%D1%80%D0%BE%D0%B4%D1%83%D0%BA%D1%82%D0%BE%D0%B2-%D0%BF%D0%B8%D1%82%D0%B0%D0%BD%D0%B8%D1%8F-195418218.jpg",
          variant: [
            {
              size: 1,
              weight: 0,
              price: 17,
            },
          ],
          description: 'Том Ям и ролл "Эби маки"',
          compound:
            "Состав супа: паста Том Ям, кокосовое молоко, сливки, тофу, рыбный соус, креветка, мидии, грибы шиитаки, кинза. Состав ролла: Рис, нори, креветка, сыр «Филадельфия», салат «Айсберг»",
        },
        {
          name: "Ланч #2",
          link: "lanch-2",
          img: "https://img4.goodfon.ru/wallpaper/nbig/b/2e/moreprodukty-sushi-sup-eda.jpg",
          variant: [
            {
              size: 1,
              weight: 0,
              price: 17,
            },
          ],
          description: 'Том Ям и ролл "Эби маки"',
          compound:
            "Состав супа: паста Том Ям, кокосовое молоко, сливки, тофу, рыбный соус, креветка, мидии, грибы шиитаки, кинза. Состав ролла: Рис, нори, креветка, сыр «Филадельфия», салат «Айсберг»",
        },
        {
          name: "Ланч #3",
          link: "lanch-3",
          img: "https://thumbs.dreamstime.com/b/%D0%B0%D0%B7%D0%B8%D0%B0%D1%82%D1%81%D0%BA%D0%B0%D1%8F-%D0%B5%D0%B4%D0%B0-%D0%B1%D1%8B%D0%BB%D0%B0-%D0%BB%D0%B0%D0%BF%D1%88%D0%B0-%D1%81%D1%83%D0%BF-%D0%B8-%D1%81%D0%BF%D0%B8%D1%81%D0%BA%D0%B8-%D1%81%D1%83%D1%88%D0%B8-%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D0%B0-%D0%BF%D1%80%D0%BE%D0%B4%D1%83%D0%BA%D1%82%D0%BE%D0%B2-%D1%81-%D0%B4%D1%80%D1%83%D0%B3%D0%B8%D0%BC-198508394.jpg",
          variant: [
            {
              size: 1,
              weight: 0,
              price: 17,
            },
          ],
          description: 'Том Ям и ролл "Эби маки"',
          compound:
            "Состав супа: паста Том Ям, кокосовое молоко, сливки, тофу, рыбный соус, креветка, мидии, грибы шиитаки, кинза. Состав ролла: Рис, нори, креветка, сыр «Филадельфия», салат «Айсберг»",
        },
      ],
      link: "lanchi",
      img: "https://unitsky.store/upload/iblock/a5a/ujgs4syeufubykdi7u4iqlemetuca2v6.jpg",
    },
    {
      name: "Суши",
      dataMenu: [
        {
          name: "Филадельфия",
          link: "filadelfia-classic",
          img: "https://seadelivery.by/upload/iblock/55f/55f30863fc5110f98ccc84c22caf5cee.jpg",
          variant: [
            {
              size: "4",
              weight: 130,
              price: 7.5,
            },
            {
              size: "8",
              weight: 260,
              price: 14,
            },
          ],
          compound: "Состав: Рис, нори, сыр Филадельфия, форель с/с",
        },
        {
          name: "Унаги Маки",
          link: "ynagi-maki",
          img: "https://sushi-tunec.ru/img.php?image=model_1056340851623494020.jpg&w=1200",
          variant: [
            {
              size: 8,
              weight: 155,
              price: 9.5,
            },
          ],
          compound:
            "Состав: Рис, нори,японский майонез, угорь жареный в соусе терияки, огурец,",
        },
      ],
      link: "sushi",
      img: "https://img.championat.com/news/big/w/q/pochemu-sushi-vredny-dlja-figury_1590677088981164064.jpg",
    },
    {
      name: "Пиццы",
      dataMenu: [],
      link: "pizza",
      img: "https://www.gastronom.ru/binfiles/images/20191113/bd570867.jpg",
    },
    {
      name: "Салаты",
      dataMenu: [],
      link: "salads",
      img: "https://espanarusa.com/files/autoupload/74/9/21/22hlb0zw385445.jpg",
    },
    {
      name: "Гарниры, соусы",
      dataMenu: [],
      link: "sauces",
      img: "https://odintsovo.eshak.ru/images/virtuemart/product/resized/DSC_5043_500x340.jpg",
    },
    {
      name: "Десерты",
      dataMenu: [],
      link: "desserts",
      img: "https://e0.edimdoma.ru/data/posts/0002/2712/22712-ed4_wide.jpg?1631189293",
    },
    {
      name: "Лапша WOK",
      dataMenu: [],
      link: "noodles",
      img: "https://kulinario.me/images/1500.jpg",
    },
    {
      name: "Драники",
      dataMenu: [],
      link: "hash-browns",
      img: "https://the-challenger.ru/wp-content/uploads/2018/04/shutterstock_618093359-800x533.jpg",
    },
    {
      name: "Напитки",
      dataMenu: [],
      link: "beverages",
      img: "https://pibig.info/uploads/posts/2022-12/1669966439_2-pibig-info-p-koka-kola-sprait-i-oboi-2.jpg",
    },
    {
      name: "Закуски",
      dataMenu: [],
      link: "snacks",
      img: "https://img.freepik.com/premium-photo/a-set-of-snacks-for-beer-nuggets-french-fries-dumplings-onion-rings-and-chips-with-tomato-and-cheese-sauce-on-a-round-wooden-board-light-wooden-background-view-from-above_323569-1084.jpg",
    },
    {
      name: "Супы",
      dataMenu: [],
      link: "soups",
      img: "https://vkusno-i-prosto.ru/wp-content/uploads/2022/04/Depositphotos_203227612_S.jpg",
    },
    {
      name: "Поке",
      dataMenu: [],
      link: "poke",
      img: "https://s1.eda.ru/StaticContent/Photos/120213175233/180404152931/p_O.jpg",
    },
  ];

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
        navbar={<NavBarApp links={links} opened={opened} />}
        footer={
          <Footer height={60} p="md">
            Application footer
          </Footer>
        }
        header={
          <HeaderSimple links={links} opened={opened} setOpened={setOpened} />
        }
      >
        <Routes>
          <Route path="/" element={<HomePage data={data} />} />
          <Route path="/:category" element={<CategoryPage data={data} />} />
          <Route
            path="/:category/:product"
            element={<ProductPage data={data} />}
          />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
};
export default App;
