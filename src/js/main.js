// base function for accessing api
async function GetJson(url) {
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
async function FindSong(artist, songTitle) {
    const baseUrl = `https://itunes.apple.com/search?term=${artist}+${songTitle}&media=music&entity=musicTrack&limit=1`;
    const data = await GetJson(baseUrl);

    if (data.resultCount > 0) {
        const song = data.results[0];
        return song;
    } else {
        console.log("No song found.");
        return;
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

function ConvertMillisToMins(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes} minutes and ${seconds.toString().padStart(2, '0')} seconds`
}

async function SongTemplate(artist, songTitle) {
    let song = await FindSong(artist, songTitle);
    if (!song) {
        return `<p> No song found for "${artist} - ${songTitle}"</p>`
    }
    return `<div class="song">
                <img src="${song.artworkUrl100}" alt="${song.artistName} ${song.collectionName} album cover">
                <p class="song-length">${ConvertMillisToMins(song.trackTimeMillis)}</p>
                <p class="song-title">${song.trackName}</p>
                <p class="album-title">${song.collectionName}</p>
                <p class="artist">${song.artistName}</p>
            </div>`
}
async function LoadSongs() {
    const songs = [
        ["nicky youre", "sunroof"],
        ["taylor swift", "cruel summer"],
        ["wave to earth", "bad"],
        ["one direction", "steal my girl"],
        ["quinn xcii", "melt"]
    ];
    const songsContainer = document.querySelector(".music-library");
    const songHtmlArray = await Promise.all(songs.map(([artist, title]) => SongTemplate(artist, title)))
    songsContainer.innerHTML = songHtmlArray.join("");
}

LoadSongs();