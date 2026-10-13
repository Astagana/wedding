/* Vercel Serverless Function: /api/comments
   Penyimpanan: Upstash Redis (REST). Variabel environment dibuat otomatis
   saat database Upstash dihubungkan ke project Vercel. */

const KEY = process.env.COMMENTS_KEY || 'wedding:comments';
const URL_ = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const ATTEND = ['hadir', 'tidak', 'ragu'];

async function redis(cmd) {
  const r = await fetch(URL_, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd)
  });
  const d = await r.json();
  if (d.error) throw new Error(d.error);
  return d.result;
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (!URL_ || !TOKEN) return res.status(500).json({ error: 'Database belum terhubung' });

  try {
    if (req.method === 'GET') {
      const items = await redis(['LRANGE', KEY, 0, 199]);
      const comments = (items || []).map((i) => { try { return JSON.parse(i); } catch (e) { return null; } }).filter(Boolean);
      return res.status(200).json({ comments });
    }

    if (req.method === 'POST') {
      let b = req.body;
      if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = {}; } }
      b = b || {};

      if (b.website) return res.status(200).json({ ok: true }); // honeypot (bot)

      const name = String(b.name || '').trim().slice(0, 40);
      const message = String(b.message || '').trim().slice(0, 500);
      const attendance = ATTEND.includes(b.attendance) ? b.attendance : 'hadir';
      if (name.length < 2 || message.length < 2) return res.status(400).json({ error: 'Nama dan ucapan minimal 2 karakter' });

      const ip = String(req.headers['x-forwarded-for'] || 'x').split(',')[0].trim();
      const rl = 'wedding:rl:' + ip;
      const n = await redis(['INCR', rl]);
      if (n === 1) await redis(['EXPIRE', rl, 60]);
      if (n > 5) return res.status(429).json({ error: 'Terlalu banyak kiriman, coba lagi sebentar lagi' });

      const comment = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), name, message, attendance, at: Date.now() };
      await redis(['LPUSH', KEY, JSON.stringify(comment)]);
      await redis(['LTRIM', KEY, 0, 499]);
      return res.status(201).json({ comment });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
};
