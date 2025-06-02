const p = document.querySelector(".test-p");
const button = document.querySelector(".test-button");
button.addEventListener("click", (event) => {
  p.textContent = "This text is different now";
});
