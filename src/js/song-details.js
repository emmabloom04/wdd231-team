import { FindSong, ConvertMillisToMins } from "./main";

async function showSongDetails(songTitle, artist) {
  let song = await FindSong(songTitle, artist);

  if (!song) {
    console.error("Song could not be loaded.");
    return;
  }

  document.querySelector(".song-container").innerHTML = `
        <img src="${song.artworkUrl100}" alt="${song.artistName} ${
    song.collectionName
  }">
        <p id="song-name">${song.trackName}</p>
        <p id="artist-name">${song.artistName}</p>
        <p id="album-name">${song.collectionName}</p>
        <p id="song-genre">${song.primaryGenreName}</p>
        <p id="song-length">${ConvertMillisToMins(song.trackTimeMillis)}</p>
        <audio controls id="song-snippet">
            <source src="${song.previewUrl}" type="audio/mpeg">
                Your browser does not support the audio element.
        </audio>
    `;
}

const paramsString = window.location.search;
const params = new URLSearchParams(paramsString);

let song = params.get("song");
song = song.replaceAll("*", " ");
let artist = params.get("artist");
artist = artist.replaceAll("*", " ");
showSongDetails(song, artist);
