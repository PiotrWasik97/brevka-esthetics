const menuIconElement = document.querySelector(".menu-icon");
const sidebarElement = document.querySelector(".sidebar");
const crossIconElement = document.querySelector(".cross-icon");

menuIconElement.addEventListener("click", () => {
  sidebarElement.style.display = "flex";
})

crossIconElement.addEventListener("click", () => {
  sidebarElement.style.display = "none";
})