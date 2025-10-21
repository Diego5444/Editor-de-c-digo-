// vercel-proxy.js
export default async function handler(req, res) {
  const target = req.query.url;
  if (!target) {
    res.status(400).send("Falta parámetro 'url'");
    return;
  }

  try {
    const response = await fetch(target, {
      headers: {
        "Referer": "https://onfilom.com",
        "Origin": "https://onfilom.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
      }
    });

    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const data = await response.arrayBuffer();
    res.setHeader("Content-Type", contentType);
    res.send(Buffer.from(data));
  } catch (err) {
    res.status(500).send("Error en el proxy: " + err.message);
  }
}
