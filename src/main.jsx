import React from "react";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/carousel/styles.css";
import '@mantine/notifications/styles.css';
import "./index.css";
import "dayjs/locale/ru";
import '@mantine/tiptap/styles.css';
import { ModalsProvider } from "@mantine/modals";
import { Provider } from "react-redux";
import store, { persistor } from './store'
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { ActionIcon, Button, MantineProvider, Table, Title, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { DatesProvider } from "@mantine/dates";
import classes from './main.module.css'

const theme = createTheme({
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
    ActionIcon: ActionIcon.extend ({
      defaultProps: {
        variant: 'outline'
      },
    }),
    Button: Button.extend({
      defaultProps: {
        color: 'black',
        variant: 'outline'
      }
    }),
    Title: Title.extend({
      classNames: {
        root: classes.titleRoot
      }
    }),
    Table: Table.extend({
      classNames: {
        root: classes.tableRoot
      }
    }),
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider theme={theme}>
    <Notifications position="top-right" zIndex={1000}/>
    <DatesProvider
      settings={{ locale: "ru", firstDayOfWeek: 0, weekendDays: [0] }}
    >
      <ModalsProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </ModalsProvider>
    </DatesProvider>
  </MantineProvider>
);
