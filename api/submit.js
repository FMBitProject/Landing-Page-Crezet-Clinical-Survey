export default async function handler(req, res) {
    // Hanya izinkan metode POST
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    // Mengambil URL Apps Script dari Environment Variables Vercel
    const SCRIPT_URL = process.env.Databasescript_URL;
  
    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
  
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  }