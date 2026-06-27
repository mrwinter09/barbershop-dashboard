/** @format */

import { Link, useLocation } from "react-router-dom";
import { Button, Box, Text } from "@mantine/core";
import { useLang } from "../../i18n";

export default function Navbar() {
  const { pathname } = useLocation();
  const { t, lang, setLang } = useLang();

  const NAV = [
    { path: "/", label: t("nav_home") },
    { path: "/stories", label: t("nav_stories") },
    { path: "/about", label: t("nav_chair") },
    { path: "/recommend", label: t("nav_recommend") },
  ];

  return (
    <Box
      component="nav"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px clamp(20px, 5vw, 56px)",
        backgroundColor: "rgba(245, 238, 223, 0.88)",
        backdropFilter: "blur(10px) saturate(1.1)",
        borderBottom: "1px solid #E0D3B8",
      }}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <Text
          style={{
            fontFamily: '"Newsreader", Georgia, serif',
            fontWeight: 600,
            fontSize: 22,
            letterSpacing: "-0.02em",
            color: "#211A12",
          }}
        >
          Clipper<em style={{ fontStyle: "italic", color: "#C26B4A" }}>Takes</em>
        </Text>
      </Link>

      <Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(14px, 2.4vw, 30px)",
          flexWrap: "wrap",
        }}
      >
        {NAV.map((n) => {
          const active = pathname === n.path || (n.path !== "/" && pathname.startsWith(n.path));
          return (
            <Link key={n.path} to={n.path} style={{ textDecoration: "none" }}>
              <Text
                size="sm"
                style={{
                  fontWeight: 500,
                  color: active ? "#15454F" : "#3F2D20",
                  borderBottom: active ? "2px solid #F2C200" : "2px solid transparent",
                  paddingBottom: 2,
                  transition: "color .2s, border-color .2s",
                }}
              >
                {n.label}
              </Text>
            </Link>
          );
        })}
        <Button
          component={Link}
          to="/submit"
          color="yellow"
          variant="filled"
          size="sm"
          styles={{ root: { color: "#211A12", fontWeight: 600 } }}
        >
          {t("nav_tell")}
        </Button>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #CBB994",
            borderRadius: 6,
            overflow: "hidden",
            fontFamily: '"Space Mono", monospace',
            fontSize: 12,
          }}
        >
          {(["en", "nl"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                padding: "4px 10px",
                background: lang === l ? "#15454F" : "transparent",
                color: lang === l ? "#FCF8F0" : "#6A5440",
                border: "none",
                cursor: "pointer",
                fontFamily: '"Space Mono", monospace',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                transition: "background .15s, color .15s",
              }}
            >
              {l}
            </button>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
