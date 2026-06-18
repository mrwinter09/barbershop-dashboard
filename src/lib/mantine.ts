/** @format */

import { type MantineProviderProps, createTheme, rem } from "@mantine/core";

export const mantineTheme = createTheme({
  primaryColor: "petrol",
  primaryShade: 7,
  colors: {
    petrol: ["#E9F1F1","#CBDEE0","#A9CACE","#86B0B6","#5E9099","#2A6E79","#1C5862","#15454F","#103840","#0C2A30"],
    paper:  ["#FCF8F0","#F5EEDF","#ECE2CC","#E0D3B8","#CBB994","#B7A079","#9C8466","#7E6A52","#5E4F3E","#3F352A"],
    clay:   ["#FBEFE8","#F1DACB","#E6BFA6","#DDA488","#D08964","#C26B4A","#AE5234","#8E4128","#6E331F","#4F2516"],
    moss:   ["#F1F3E8","#DEE3CC","#C7CFAB","#A9B58E","#8C9B6E","#74855A","#5E6E44","#4C5A34","#3A4527","#28301A"],
    yellow: ["#FBEFBF","#FAE48A","#FFD83E","#FFD22E","#F2C200","#D9AE00","#B89400","#937600","#6E5800","#4A3B00"],
    coffee: ["#F3ECE4","#E2D2C2","#C8AD96","#A9866A","#8A6549","#6A5440","#3F2D20","#322318","#261A12","#1A110B"],
  },
  white: "#FCF8F0",
  black: "#211A12",
  fontFamily: '"Hanken Grotesk", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  fontFamilyMonospace: '"Space Mono", ui-monospace, Menlo, monospace',
  headings: {
    fontFamily: '"Newsreader", Georgia, serif',
    fontWeight: "600",
  },
  defaultRadius: "sm",
  radius: { xs: rem(3), sm: rem(5), md: rem(8), lg: rem(12), xl: rem(16) },
  shadows: {
    sm: "0 1px 2px rgba(38,26,18,.06), 0 2px 6px rgba(38,26,18,.05)",
    md: "0 2px 4px rgba(38,26,18,.05), 0 8px 20px rgba(38,26,18,.10)",
    lg: "0 6px 12px rgba(38,26,18,.08), 0 18px 40px rgba(12,42,48,.16)",
  },
  components: {
    Button: { defaultProps: { radius: "sm" } },
    Card:   { defaultProps: { radius: "lg", withBorder: true } },
    Badge:  { defaultProps: { radius: "xl" } },
  },
});

export const mantineProviderProps: MantineProviderProps = {
  theme: mantineTheme,
  defaultColorScheme: "light",
};
