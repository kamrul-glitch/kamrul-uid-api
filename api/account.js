export default async function handler(req, res) {
  // CORS fix
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { uid } = req.query; // BD-only

  if(!uid) return res.status(400).json({ error: "UID required" });

  try {
    // Original OB52 API থেকে BD region
    const response = await fetch(`https://info-ob52.vercel.app/api/account/?uid=${uid}&region=BD`);
    const data = await response.json();

    res.status(200).json({ nickname: data.AccountInfo?.AccountName || "Not found" });

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch" });
  }
}
