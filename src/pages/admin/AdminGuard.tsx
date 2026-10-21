/** @format */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/admin-session")
      .then(r => r.json())
      .then(({ valid }) => {
        if (!valid) navigate("/admin", { replace: true });
        else setChecking(false);
      })
      .catch(() => navigate("/admin", { replace: true }));
  }, [navigate]);

  if (checking) {
    return (
      <div style={{ background: "#0A0504", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#3D2020" }}>Loading...</span>
      </div>
    );
  }

  return <>{children}</>;
}
