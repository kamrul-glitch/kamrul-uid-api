export default async function handler(req, res) {
  
  res.setHeader("Access-Control-Allow-Origin", "*"); // CORS পারমিট

  const { uid, region } = req.query;
  if (!uid || !region) {
    return res.status(400).json({ error: "UID and region required" });
  }

  try {
    // এখানে তুমি fetch URL পরিবর্তন করে নিজের API / OB52 API দিতে পারো
    const response = await fetch(`https://info-ob52.vercel.app/api/account/?uid=${uid}&region=${region}`);
    const data = await response.json();

    res.status(200).json({
      nickname: data.AccountInfo?.AccountName || "Not found"
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
}
