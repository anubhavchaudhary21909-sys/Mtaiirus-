import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // --- CORS ---
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const app = req.query.app;

  if (!app) {
    res.status(400).json({ error: "Missing required parameter: app" });
    return;
  }

  try {
    // Every domain is stored under key "domain:<id>"
    const entry = await kv.get(`domain:${app}`);

    if (!entry) {
      res.status(404).json({ error: "Domain not found" });
      return;
    }

    res.status(200).json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Storage read failed" });
  }
}
