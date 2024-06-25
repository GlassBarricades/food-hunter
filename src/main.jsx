import React from "react";
import ReactDOM from "react-dom/client";
import '@mantine/carousel/styles.css'
import './index.css'
import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css'
import 'dayjs/locale/ru'
import { ModalsProvider } from "@mantine/modals";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { DatesProvider } from "@mantine/dates";


const theme = createTheme({
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
//   colorScheme: colorScheme,
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
            theme.colorScheme === "dark" ? theme.colors.yellow[5] : theme.black,
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
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
    <DatesProvider
					settings={{ locale: 'ru', firstDayOfWeek: 0, weekendDays: [0] }}
				>
    <ModalsProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <Notifications position='top-right' />
          <App />
        </PersistGate>
      </Provider>
    </ModalsProvider>
    </DatesProvider>
  </MantineProvider>
);
