import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const ids = await kv.smembers('domain:__index');

    if (!ids || ids.length === 0) {
      res.status(200).json([]);
      return;
    }

    const keys = ids.map(id => `domain:${id}`);
    const entries = await kv.mget(...keys);

    res.status(200).json(entries.filter(Boolean));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Storage read failed" });
  }
}
