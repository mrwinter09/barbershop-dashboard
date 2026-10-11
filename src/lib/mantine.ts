/** @format */

import { type MantineProviderProps, createTheme, rem } from "@mantine/core";

// Donn Stone — dark gold / anthracite palette
export const mantineTheme = createTheme({
  primaryColor: "gold",
  primaryShade: 5,
  colors: {
    gold:  ["#FFF9E5","#FFF0B3","#FFE066","#FFD23F","#F2C200","#D4AA00","#A88500","#7D6200","#534100","#2A2100"],
    dark:  ["#C9C9C9","#A3A3A3","#7D7D7D","#5C5C5C","#3D3D3D","#2A2A2A","#1A1A1A","#111111","#0A0A0A","#050505"],
    smoke: ["#F5F5F5","#E8E8E8","#D0D0D0","#B0B0B0","#888888","#666666","#444444","#2E2E2E","#1C1C1C","#0D0D0D"],
    accent:["#FFE8D6","#FFD0AC","#FFB07A","#FF8C42","#F26D1B","#D45800","#A84400","#7D3200","#522100","#2A1000"],
  },
  white: "#FFFFFF",
  black: "#0A0A0A",
  fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
  fontFamilyMonospace: '"Space Mono", ui-monospace, monospace',
  headings: {
    fontFamily: '"Monument Extended", "Bebas Neue", "Inter", sans-serif',
    fontWeight: "700",
  },
  defaultRadius: "sm",
  radius: { xs: rem(2), sm: rem(4), md: rem(8), lg: rem(12), xl: rem(20) },
  components: {
    Button: { defaultProps: { radius: "sm" } },
  },
});

export const mantineProviderProps: MantineProviderProps = {
  theme: mantineTheme,
  defaultColorScheme: "dark",
};
