import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: "Method not allowed, use POST" });
    return;
  }

  // --- Simple key protection so randoms can't write to your data ---
  const providedKey = req.headers['x-admin-key'];
  if (!process.env.ADMIN_SECRET || providedKey !== process.env.ADMIN_SECRET) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const body = req.body;

  if (!body || !body.id) {
    res.status(400).json({ error: "Request body must include an 'id' field" });
    return;
  }

  // --- Build the entry in the exact shape the read endpoint returns ---
  const entry = {
    id: String(body.id),
    domain: body.domain || "",
    name: body.name || "",
    "stylishName(brand)": body["stylishName(brand)"] || body.stylishName || "",
    image: body.image || "",
    token: body.token || "",
    courseid: body.courseid !== undefined ? Number(body.courseid) : 0,
    player_url: body.player_url || "",
    pdf_view_api: body.pdf_view_api || "",
    pdf_dow_api: body.pdf_dow_api || "",
  };

  try {
    await kv.set(`domain:${entry.id}`, entry);
    // Keep a running list of all IDs so the admin page can list them
    await kv.sadd('domain:__index', entry.id);

    res.status(200).json({ success: true, entry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Storage write failed" });
  }
}
