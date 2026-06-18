/** @format */

import { Link, useLocation } from "react-router-dom";
import { Button, Box, Text } from "@mantine/core";

const NAV = [
  { path: "/", label: "Home" },
  { path: "/stories", label: "The Stories" },
  { path: "/about", label: "The Chair" },
  { path: "/recommend", label: "Recommend someone" },
];

export default function Navbar() {
  const { pathname } = useLocation();

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
          Tell your story
        </Button>
      </Box>
    </Box>
  );
}
