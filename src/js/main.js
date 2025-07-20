import { AddSongs, LoadSongs } from "./song-list";

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
