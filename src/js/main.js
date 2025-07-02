// base function for accessing api
async function GetJson(url) {
  const options = {
    method: "GET",
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
export async function FindSong(artist, songTitle) {
  const baseUrl = `/api/itunes?artist=${artist}&song=${songTitle}`;

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

export function ConvertMillisToMins(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes} minutes and ${seconds
    .toString()
    .padStart(2, "0")} seconds`;
}

async function SongTemplate(artist, songTitle, index) {
  const title = songTitle.replaceAll("*", " ");
  const artistName = artist.replaceAll("*", " ");
  const urlArtist = artistName.replaceAll(" ", "*");
  const urlSong = title.replaceAll(" ", "*");

  let song = await FindSong(artistName, title);
  if (!song) {
    return `<div class="song" data-index="${index}">
              <p>No song found for "${artistName} - ${title}"</p>
              <button class="delete-song" data-index="${index}">Delete Song</button>
            </div>`;
  }
  return `<div class="song" data-index="${index}">
            <a href="song-details.html?song=${urlSong}&artist=${urlArtist}">
              <img src="${song.artworkUrl100}" alt="${song.artistName} ${song.collectionName} album cover">
              <p class="song-length">${ConvertMillisToMins(song.trackTimeMillis)}</p>
              <p class="song-title">${song.trackName}</p>
              <p class="album-title">${song.collectionName}</p>
              <p class="artist">${song.artistName}</p>
            </a>
            <button class="delete-song" data-index="${index}">Delete Song</button>
          </div>`;
}

function AddSongs(songList) {
  const songTitle = document.getElementById("title").value;
  const artistName = document.getElementById("artist").value;

  let urlArtist = artistName.replaceAll(" ", "*");
  let urlSong = songTitle.replaceAll(" ", "*");
  const songInfo = [urlSong, urlArtist];

  songList.push(songInfo);
  localStorage.setItem("songList", JSON.stringify(songList));
}


async function LoadSongs(songList) {
  const songsContainer = document.querySelector(".music-library");

  if (!songList || songList.length === 0) {
    songsContainer.innerHTML = `<p>No songs added yet!</p>`;
    return;
  }

  const songHtmlArray = await Promise.all(
    songList.map(([artist, title], index) => SongTemplate(artist, title, index))
  );
  songsContainer.innerHTML = songHtmlArray.join("");

  // Setup delete buttons
  const deleteButtons = document.querySelectorAll(".delete-song");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const indexToDelete = parseInt(button.getAttribute("data-index"));
      let songList = JSON.parse(localStorage.getItem("songList")) || [];
      songList.splice(indexToDelete, 1);
      localStorage.setItem("songList", JSON.stringify(songList));
      LoadSongs(songList); // Reload songs after deletion
    });
  });
}

if (document.title == "Spinlist") {
  document.getElementById("new-song").addEventListener("click", () => {
    window.location.href = "song-form.html";
  });

  const storedList = localStorage.getItem("songList");
  let songList = [];
  if (storedList) {
    songList = JSON.parse(storedList);
  }
  LoadSongs(songList);
}

if (document.title == "New Song") {
  document.getElementById("save-button").addEventListener("click", (e) => {
    e.preventDefault();
    const storedList = localStorage.getItem("songList");
    let songList = storedList ? JSON.parse(storedList) : [];
    AddSongs(songList);
    window.location.href = "index.html";
  });
}
