/** @format */

import { Link } from "react-router-dom";
import { Box, Text } from "@mantine/core";

const PAPER_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E\")";

const linkStyle: React.CSSProperties = {
  display: "block",
  background: "none",
  border: 0,
  color: "#A9CACE",
  fontSize: 15,
  fontFamily: '"Hanken Grotesk", sans-serif',
  padding: "5px 0",
  textDecoration: "none",
};

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0C2A30",
        backgroundImage: PAPER_TEXTURE,
        color: "#A9CACE",
        padding: "clamp(40px, 6vw, 72px) clamp(20px, 5vw, 56px) 36px",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 40,
          justifyContent: "space-between",
          alignItems: "flex-start",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <div>
          <Text
            style={{
              fontFamily: '"Newsreader", Georgia, serif',
              fontWeight: 600,
              fontSize: 30,
              color: "#FCF8F0",
              letterSpacing: "-0.02em",
            }}
          >
            Clipper<em style={{ fontStyle: "italic", color: "#F2C200" }}>Takes</em>
          </Text>
          <Text
            mt={10}
            style={{ maxWidth: 360, lineHeight: 1.6, color: "#A9CACE", fontSize: 15 }}
          >
            A travelling barber chair collecting fifty voices from Rotterdam, one
            conversation, one haircut, one story at a time.
          </Text>
        </div>

        <div>
          <Text
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#5E9099",
              marginBottom: 12,
            }}
          >
            The project
          </Text>
          <Link to="/stories" style={linkStyle}>The Stories</Link>
          <Link to="/about" style={linkStyle}>The Chair</Link>
          <Link to="/submit" style={linkStyle}>Tell your story</Link>
          <Link to="/recommend" style={linkStyle}>Recommend someone</Link>
        </div>

        <div>
          <Text
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#5E9099",
              marginBottom: 12,
            }}
          >
            Rotterdam
          </Text>
          <Link to="/stories" style={linkStyle}>Afrikaanderwijk</Link>
          <Link to="/stories" style={linkStyle}>Delfshaven</Link>
          <Link to="/stories" style={linkStyle}>Nieuwe Binnenweg</Link>
          <Link to="/stories" style={linkStyle}>Noord</Link>
        </div>
      </Box>

      <Box
        style={{
          borderTop: "1px solid rgba(255,255,255,0.12)",
          margin: "36px auto 18px",
          maxWidth: 1280,
        }}
      />
      <Box
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px 18px",
          justifyContent: "space-between",
          fontFamily: '"Space Mono", monospace',
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#5E9099",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <span>ClipperTakes Studio · Rotterdam · 2026</span>
        <Link to="/admin" style={{ ...linkStyle, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5E9099" }}>Studio admin</Link>
      </Box>
    </footer>
  );
}
