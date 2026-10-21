/** @format */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const GITHUB_REPO = "mrwinter09/barbershop-dashboard";

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

async function createIssue(title: string, body: string) {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/issues`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body, labels: ["booking", "status: new"] }),
  });
  if (!res.ok) return null;
  return res.json();
}

async function listIssues() {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/issues?labels=booking&state=open&per_page=100`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
  });
  if (!res.ok) return [];
  return res.json();
}

async function updateIssueStatus(issueNumber: number, newStatus: string) {
  const getRes = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/issues/${issueNumber}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    }
  );
  if (!getRes.ok) return false;
  const issue = (await getRes.json()) as { labels: Array<{ name: string }> };

  const otherLabels = issue.labels
    .map((l: { name: string }) => l.name)
    .filter((n: string) => !n.startsWith("status:"));

  const newLabels = [...otherLabels, `status: ${newStatus}`];
  const state = ["completed", "declined"].includes(newStatus) ? "closed" : "open";

  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/issues/${issueNumber}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ labels: newLabels, state }),
    }
  );
  return res.ok;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    const { name, email, date, venue, details } = req.body as {
      name: string;
      email: string;
      date: string;
      venue: string;
      details: string;
    };
    const title = `Booking: ${name} — ${date}`;
    const body = `**Name:** ${name}\n**Email:** ${email}\n**Date:** ${date}\n**Venue/Event:** ${venue}\n\n**Details:**\n${details}\n\n---\n*Submitted: ${new Date().toISOString()}*`;
    const issue = await createIssue(title, body);
    if (!issue) return res.status(500).json({ error: "Failed to create booking" });
    return res.json({ ok: true });
  }

  if (req.method === "GET") {
    if (!verifySession(req)) return res.status(401).json({ error: "Unauthorized" });
    const issues = await listIssues();
    const closedUrl = `https://api.github.com/repos/${GITHUB_REPO}/issues?labels=booking&state=closed&per_page=50`;
    const closedRes = await fetch(closedUrl, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    });
    const closedIssues = closedRes.ok ? await closedRes.json() : [];
    return res.json({ bookings: [...issues, ...closedIssues] });
  }

  if (req.method === "PATCH") {
    if (!verifySession(req)) return res.status(401).json({ error: "Unauthorized" });
    const { issueNumber, status } = req.body as { issueNumber: number; status: string };
    const validStatuses = ["new", "in discussion", "confirmed", "completed", "declined"];
    if (!validStatuses.includes(status)) return res.status(400).json({ error: "Invalid status" });
    const ok = await updateIssueStatus(issueNumber, status);
    if (!ok) return res.status(500).json({ error: "Failed to update" });
    return res.json({ ok: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
