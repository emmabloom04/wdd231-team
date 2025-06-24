export async function handler(event, context) {
  const params = event.queryStringParameters;
  const artist = params.artist;
  const song = params.song;

  if (!artist || !song) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing artist or song query parameter" }),
    };
  }

  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(artist + " " + song)}&media=music&entity=musicTrack&limit=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error("Netlify Function Error:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch from iTunes API" }),
    };
  }
}