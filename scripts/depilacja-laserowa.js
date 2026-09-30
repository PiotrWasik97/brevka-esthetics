const accordionElements = document.querySelectorAll(".laser-accordion");

accordionElements.forEach((accordion) => {
  const head = accordion.querySelector(".laser-accordion-head");
  const body = accordion.querySelector(".laser-accordion-body");

  head.addEventListener("click", () => {
    if (accordion.classList.contains("is-open")) {
      body.style.display = "none";
      accordion.classList.remove("is-open");
    } else {
      body.style.display = body.dataset.display || "block";
      accordion.classList.add("is-open");
    }
  });
});
