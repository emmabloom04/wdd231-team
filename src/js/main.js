// base function for accessing api
async function getJson(url) {
    const options = {
        method: "GET"
    };

    let data = {};
    const response = await fetch(url, options);
    if (response.ok) {
        data = await response.json();
    } else {
        throw new Error("response not ok");
    }
    return data;
}

// function for accessing itunes api
async function findSong(artist, songTitle) {
    const baseUrl = `https://itunes.apple.com/search?term=${artist}+${songTitle}&media=music&entity=musicTrack&limit=1`;
    const data = await getJson(baseUrl);

    if (data.resultCount > 0) {
        const song = data.results[0];
        console.log("Found:", song.trackName, "by", song.artistName);
        console.log("Preview", song.previewUrl);
        console.log("Artwork:", song.artworkUrl100);
    } else {
        console.log("No song found.");
    }
}
// different data returned from itunes api:
// Field                        Description
// wrapperType                  Type of wrapper (e.g., track)
// kind                         Type of result (e.g., song)
// artistId                     Unique ID for the artist
// collectionId                 Unique ID for the album (collection)
// trackId                      Unique ID for the track
// artistName                   Artist’s name
// collectionName               Album name
// trackName                    Song title
// collectionCensoredName       Censored album name (if applicable)
// trackCensoredName            Censored song title
// artistViewUrl                iTunes/Apple Music artist page
// collectionViewUrl            Album page
// trackViewUrl                 Song page
// previewUrl                   30-90 sec audio sample (M4A format)
// artworkUrl30                 30x30 artwork image
// artworkUrl60                 60x60 artwork image
// artworkUrl100                100x100 artwork image
// collectionPrice              Album price
// trackPrice                   Song price
// releaseDate                  ISO-formatted release date
// collectionExplicitness       Explicit status of the album
// trackExplicitness            Explicit status of the song
// discCount                    Total number of discs in album
// discNumber                   Which disc the track is on
// trackCount                   Total tracks on the album
// trackNumber                  Track’s position in the album
// trackTimeMillis              Duration of the song in milliseconds
// country                      Country of the store used (e.g. USA)
// currency                     Currency (e.g. USD)
// primaryGenreName             Genre of the track
// isStreamable                 Whether it’s streamable


function songTemplate() {
    return `<div class="song" id="sunroof">
                <img src="images/sunroof.jpeg" alt="nicky youre and hey daisy sunroof album cover">
                <p class="song-length">2 minutes 43 seconds</p>
                <p class="song-title">Sunroof</p>
                <p class="album-title">Sunroof - Single</p>
                <p class="artist">Nicky Youre & hey daisy</p>
            </div>`
}

findSong("nicky youre hey daisy", "sunroof");
findSong("taylor swift", "cruel summer");
findSong("wave to earth", "bad");
findSong("one direction", "steal my girl");
findSong("quinn xcii", "melt");