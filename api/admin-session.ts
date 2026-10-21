import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";

const COOKIE = "ds_admin";

function parseCookie(header: string | undefined, name: string): string | null {
  if (!header) return null;
  const entry = header.split(";").find((c) => c.trim().startsWith(name + "="));
  return entry ? entry.trim().slice(name.length + 1) : null;
}

function verifyToken(token: string, secret: string): boolean {
  const dot = token.lastIndexOf(".");
  if (dot === -1) return false;
  const expiryStr = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expiry = parseInt(expiryStr, 10);
  if (isNaN(expiry) || Date.now() > expiry) return false;
  const expected = crypto.createHmac("sha256", secret).update(expiryStr).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return res.status(200).json({ valid: false });

  const token = parseCookie(req.headers.cookie as string | undefined, COOKIE);
  if (!token) return res.status(200).json({ valid: false });

  return res.status(200).json({ valid: verifyToken(token, secret) });
}
