import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { slug } = req.body;
    if (!slug) return res.status(400).json({ success: false });

    const filePath = path.resolve('.scripts/count-data.json');
    let data = {};
    if (fs.existsSync(filePath)) {
      data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }

    data[slug] = (data[slug] || 0) + 1;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return res.json({ success: true, count: data[slug] });
  }

  res.status(405).json({ success: false, message: 'Method not allowed' });
}
