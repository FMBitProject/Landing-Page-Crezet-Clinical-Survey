export default async function handler(req, res) {
  // Hanya izinkan metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Mengambil URL Apps Script dari Environment Variables Vercel
  const SCRIPT_URL = process.env.Databasescript_URL;

  // 1. PENGECEKAN URL (Mencegah error tanpa jejak)
  if (!SCRIPT_URL) {
    console.error("CRITICAL ERROR: Environment variable 'Databasescript_URL' tidak terbaca oleh Vercel.");
    return res.status(500).json({ status: 'error', message: 'Server configuration error: Missing Script URL' });
  }

  try {
    console.log("Attempting fetch to Google Apps Script..."); // Muncul di Vercel Log
    
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    // 2. TAMPILKAN ERROR DI LOG VERCEL
    console.error("FETCH ERROR:", error.message); 
    return res.status(500).json({ status: 'error', message: error.message });
  }
}