import { SongTemplate } from "./song";
import { HideModal, ShowModal } from "./modal";

export function AddSongs(songList) {
  const songTitle = document.getElementById("title").value;
  const artistName = document.getElementById("artist").value;

  let urlArtist = artistName.replaceAll(" ", "*");
  let urlSong = songTitle.replaceAll(" ", "*");
  const songInfo = [urlArtist, urlSong];

  songList.push(songInfo);
  localStorage.setItem("songList", JSON.stringify(songList));
}

export async function LoadSongs(songList) {
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
  const yesButton = document.getElementById("delete-true");
  const noButton = document.getElementById("delete-false");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      ShowModal();
      yesButton.addEventListener("click", () => {
        HideModal();
        const indexToDelete = parseInt(button.getAttribute("data-index"));
        let songList = JSON.parse(localStorage.getItem("songList")) || [];
        songList.splice(indexToDelete, 1);
        localStorage.setItem("songList", JSON.stringify(songList));
        LoadSongs(songList); // Reload songs after deletion
      });
      noButton.addEventListener("click", () => {
        HideModal();
      });
      document
        .querySelector(".modal-container")
        .addEventListener("click", () => {
          HideModal();
        });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          HideModal();
        }
      });
    });
  });
}
