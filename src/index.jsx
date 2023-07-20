import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import "dayjs/locale/ru";
import { DatesProvider } from "@mantine/dates";
import App from "./App";
import ContextOrder from "./helpers/ContextOrder";
import { uid } from "uid";

function Main() {
  const [orderLocal, setOrderLocal] = useLocalStorage({
    key: "order",
    defaultValue: [],
  });
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  function addToOrder(item, variant, price, id, value, setValue) {
    // setProductsArray([...productsArray, id]);
    // setProductsKolArr([...productsKolArr, String(value)]);
    let obj = { ...item };
    obj.quantity = value;
    obj.variantOrder = variant;
    obj.orderId = id;
    obj.priceOrder = price;
    obj.orderUuid = uid();
    // setOrderValue([...orderValue, obj])
    localStorage.user = JSON.stringify();
    let user = JSON.parse( localStorage.user );
    console.log( user );
    // setOrderLocal([...orderLocal, obj]);
    // console.log(obj)
    // setOrderLocal((current) => [...current, obj])
    if (typeof setValue === "object") {
      setValue.set(0);
    } else {
      setValue(1);
    }
  }

  function deleteOrder(id) {
    setOrderLocal(orderLocal.filter((el) => el.orderUuid !== id));
  }

  const valueContext = {
    orderLocal,
    setOrderLocal,
    addToOrder,
    deleteOrder
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          globalStyles: (theme) => ({
            ".active": {
              "&, &:hover": {
                backgroundColor: theme.fn.variant({
                  variant: "light",
                  color: theme.primaryColor,
                }).background,
                color: theme.fn.variant({
                  variant: "light",
                  color: theme.primaryColor,
                }).color,
              },
            },
          }),
          colorScheme: colorScheme,
          components: {
            Text: {
              styles: {
                root: {
                  wordSpacing: "0.05em",
                  lineHeight: "1.6em",
                  letterSpacing: "0.05em",
                },
              },
            },
            Title: {
              styles: (theme) => ({
                root: {
                  fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.yellow[5]
                      : theme.black,
                },
              }),
            },
            Table: {
              styles: {
                root: {
                  fontSize: "1.2em",
                },
              },
            },
          },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <DatesProvider
          settings={{ locale: "ru", firstDayOfWeek: 0, weekendDays: [0] }}
        >
          <ContextOrder.Provider value={valueContext}>
            <App />
          </ContextOrder.Provider>
        </DatesProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default Main;
