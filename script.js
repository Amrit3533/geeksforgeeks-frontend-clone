let toogleButton = document.getElementById("theme-toggle");
const body = document.body;

body.classList.add("light-mode");

toogleButton.addEventListener("click", () => {
  if (body.classList.contains("light-mode")) {
    body.classList.replace("light-mode", "dark-mode");
    toogleButton.textContent = "Switch to Light Mode";
  } else {
    body.classList.replace("dark-mode", "light-mode");
    toogleButton.textContent = "Switch to Dark Mode";
  }
});
