/** @format */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const GITHUB_REPO = "mrwinter09/barbershop-dashboard";
const BRANCH = "main";

function verifySession(req: VercelRequest): boolean {
  const cookie = req.headers.cookie || "";
  const match = cookie.match(/ds_admin=([^;]+)/);
  if (!match) return false;
  const token = decodeURIComponent(match[1]);
  const [expiryStr, sig] = token.split(".");
  if (!expiryStr || !sig) return false;
  if (Date.now() > parseInt(expiryStr)) return false;
  const secret = process.env.ADMIN_PASSWORD!;
  const expected = crypto.createHmac("sha256", secret).update(expiryStr).digest("hex");
  return sig === expected;
}

async function getFileFromGitHub(path: string) {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}?ref=${BRANCH}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { content: string; sha: string };
  const content = Buffer.from(data.content, "base64").toString("utf-8");
  return { content: JSON.parse(content), sha: data.sha };
}

async function writeFileToGitHub(
  path: string,
  content: unknown,
  sha: string | undefined,
  message: string
) {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`;
  const body: Record<string, unknown> = {
    message,
    content: Buffer.from(JSON.stringify(content, null, 2)).toString("base64"),
    branch: BRANCH,
  };
  if (sha) body.sha = sha;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return res.ok;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const section = req.query.section as string;
  const validSections = ["home", "videos", "tour", "bio", "festivals", "agencies"];
  if (!section || !validSections.includes(section)) {
    return res.status(400).json({ error: "Invalid section" });
  }

  if (req.method === "GET") {
    const file = await getFileFromGitHub(`content/${section}.json`);
    if (!file) return res.status(404).json({ error: "Not found" });
    return res.json({ data: file.content, sha: file.sha });
  }

  if (req.method === "PUT") {
    if (!verifySession(req)) return res.status(401).json({ error: "Unauthorized" });
    const { data, sha } = req.body as { data: unknown; sha: string };
    const ok = await writeFileToGitHub(
      `content/${section}.json`,
      data,
      sha,
      `cms: update ${section} content`
    );
    if (!ok) return res.status(500).json({ error: "Failed to write" });
    return res.json({ ok: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
