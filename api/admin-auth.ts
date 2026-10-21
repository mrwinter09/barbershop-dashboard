import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";

const COOKIE = "ds_admin";
const SESSION_HOURS = 8;

function makeToken(secret: string): string {
  const expiry = Date.now() + SESSION_HOURS * 3600 * 1000;
  const sig = crypto.createHmac("sha256", secret).update(String(expiry)).digest("hex");
  return `${expiry}.${sig}`;
}

function safeCompare(a: string, b: string): boolean {
  const max = Math.max(a.length, b.length);
  const ab = Buffer.concat([Buffer.from(a), Buffer.alloc(max - a.length)]);
  const bb = Buffer.concat([Buffer.from(b), Buffer.alloc(max - b.length)]);
  return crypto.timingSafeEqual(ab, bb) && a.length === b.length;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    const secret = process.env.ADMIN_PASSWORD;
    if (!secret) return res.status(500).json({ error: "Not configured" });

    const { password } = (req.body as { password?: string }) ?? {};
    if (!password || !safeCompare(password, secret)) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = makeToken(secret);
    res.setHeader(
      "Set-Cookie",
      `${COOKIE}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${SESSION_HOURS * 3600}`
    );
    return res.status(200).json({ ok: true });
  }

  if (req.method === "DELETE") {
    res.setHeader("Set-Cookie", `${COOKIE}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`);
    return res.status(200).json({ ok: true });
  }

  return res.status(405).end();
}
