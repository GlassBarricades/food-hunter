import { Paper, Stack, Text } from "@mantine/core";
import PhoneStack from "../PhoneStack";

const HomeNavBarCntacts = () => {
  return (
    <Paper p="xs">
      <Stack gap="sm">
        <Text weight={500}>ПРИЕМ ЗАКАЗОВ: </Text>
        <PhoneStack />
        <Text>Вс-Чт: 11:00-23:00 Пт-Сб: 11:00-00:00</Text>
      </Stack>
    </Paper>
  );
};
export default HomeNavBarCntacts;
