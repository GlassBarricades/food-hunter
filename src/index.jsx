import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

function Main() {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
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
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default Main;
