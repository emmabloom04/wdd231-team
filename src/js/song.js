import { FindSong } from "./main";

export function ConvertMillisToMins(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes} minutes and ${seconds
    .toString()
    .padStart(2, "0")} seconds`;
}

export async function SongTemplate(artist, songTitle, index) {
  const title = songTitle.replaceAll("*", " ");
  const artistName = artist.replaceAll("*", " ");
  const urlArtist = artistName.replaceAll(" ", "*");
  const urlSong = title.replaceAll(" ", "*");

  let song = await FindSong(artistName, title);
  if (!song) {
    return `<div class="song" data-index="${index}">
              <p>No song found for "${artistName} - ${title}"</p>
              <button class="delete-song" data-index="${index}">Delete</button>
            </div>`;
  }
  return `<div class="song" data-index="${index}">
            <a class="song-link" href="song-details.html?song=${urlSong}&artist=${urlArtist}">
              <img src="${song.artworkUrl100}" alt="${song.artistName} ${
    song.collectionName
  } album cover">
              <p class="song-title">${song.trackName}</p>
              <p class="artist">${song.artistName}</p>
              <p class="album-title">${song.collectionName}</p>
              <p class="song-length">${ConvertMillisToMins(
                song.trackTimeMillis
              )}</p>
            </a>
            <button class="delete-song" data-index="${index}">Delete</button>
          </div>`;
}
