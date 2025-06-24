const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/itunes', async (req, res) => {
  const { artist, song } = req.query;

  // Validate input
  if (!artist || !song) {
    return res.status(400).json({ error: "Missing artist or song in query parameters" });
  }

  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(artist + " " + song)}&media=music&entity=musicTrack&limit=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`iTunes API error: ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Backend error:", err.message);
    res.status(500).json({ error: "Failed to fetch from iTunes API" });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));