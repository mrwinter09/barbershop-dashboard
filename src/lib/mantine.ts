/** @format */

import { type MantineProviderProps, createTheme } from "@mantine/core";

export const mantineTheme = createTheme({
  fontFamily:
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
});

export const mantineProviderProps: MantineProviderProps = {
  theme: mantineTheme,
  defaultColorScheme: "light",
};
