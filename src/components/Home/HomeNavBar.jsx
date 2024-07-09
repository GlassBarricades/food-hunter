import { Anchor, ScrollArea, Stack } from "@mantine/core";
import { NavLink } from "react-router-dom";
import HomeNavBarCntacts from "./HomeNavBarCntacts";
import classes from "./HomeNavBar.module.css";
import IconsGroupAction from "../IconsGroupAction";

const linksMain = [
  {
    link: "/",
    name: "Главная",
  },
  {
    link: "/menu",
    name: "Меню",
  },
  {
    link: "/delivery",
    name: "Доставка",
  },
  {
    link: "/stock",
    name: "Акции",
  },
  {
    link: "/contacts",
    name: "Контакты",
  },
];

const HomeNavBar = ({ close }) => {
  const items = linksMain.map((link, indx) => {
    return (
      <Anchor
        component={NavLink}
        to={link.link}
        key={indx}
        className={classes.link}
        onClick={() => close()}
      >
        {link.name}
      </Anchor>
    );
  });

  return (
      <ScrollArea>
        <>{items}</>
	  <Stack gap="xs">
      <HomeNavBarCntacts />
      <IconsGroupAction />
	  </Stack>
    </ScrollArea>
  );
};
export default HomeNavBar;
