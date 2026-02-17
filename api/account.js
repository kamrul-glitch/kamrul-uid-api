export default async function handler(req, res) {
  // 🔹 CORS fix
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { uid } = req.query; // BD-only, region fixed

  if (!uid) {
    return res.status(400).json({ error: "UID required" });
  }

  try {
    // 🔹 OB52 API থেকে BD region fixed
    const response = await fetch(`https://info-ob52.vercel.app/api/account/?uid=${uid}&region=BD`);
    const data = await response.json();

    res.status(200).json({
      nickname: data.AccountInfo?.AccountName || "Not found"
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
}
